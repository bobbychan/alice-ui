import Color from 'color';
import deepMerge from 'deepmerge';
import forEach from 'lodash.foreach';
import get from 'lodash.get';
import kebabCase from 'lodash.kebabcase';
import mapKeys from 'lodash.mapkeys';
import omit from 'lodash.omit';
import plugin from 'tailwindcss/plugin';

import { animations } from './animations';
import { commonColors, semanticColors } from './colors';
import { darkLayout, defaultLayout, lightLayout } from './default-layout';
import { ConfigTheme, ConfigThemes, DefaultThemeType, PluginConfig } from './types';
import { utilities } from './utilities';
import { baseStyles } from './utils/classes';
import { flattenThemeObject } from './utils/object';

/**
 * Determines if the theme is a base theme
 *
 * @param theme string
 * @returns "light" | "dark
 */
const isBaseTheme = (theme: string) => theme === 'light' || theme === 'dark';
const DEFAULT_PREFIX = 'aliceui';
const parsedColorsCache: Record<string, number[]> = {};

// @internal
const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
) => {
  const resolved: {
    variants: { name: string; definition: string[] }[];
    utilities: Record<string, Record<string, any>>;
    colors: Record<string, string>;
  } = {
    variants: [],
    utilities: {},
    colors: {},
  };

  for (const [themeName, { extend, layout, colors }] of Object.entries(themes)) {
    let cssSelector = `.${themeName}`;
    const scheme = themeName === 'light' || themeName === 'dark' ? themeName : extend;

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      cssSelector = `${cssSelector}`;
    }

    resolved.utilities[cssSelector] = scheme
      ? {
          'color-scheme': scheme,
        }
      : {};

    // flatten color definitions
    const flatColors = flattenThemeObject(colors) as Record<string, string>;

    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {};

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });

    /**
     * Colors
     */
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) return;

      try {
        const parsedColor =
          parsedColorsCache[colorValue] || Color(colorValue).hsl().round(2).array();

        parsedColorsCache[colorValue] = parsedColor;

        const [h, s, l, defaultAlphaValue] = parsedColor;
        const herouiColorVariable = `--${prefix}-${colorName}`;

        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![herouiColorVariable] = `${h} ${s}% ${l}%`;
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = `hsl(var(${herouiColorVariable}) / ${
          defaultAlphaValue ?? '<alpha-value>'
        })`;
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error', error?.message);
      }
    }

    /**
     * Layout
     */
    /**
     * Layout
     */
    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value) return;

      const layoutVariablePrefix = `--${prefix}-${key}`;

      if (typeof value === 'object') {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedLayoutVariable = `${layoutVariablePrefix}-${nestedKey}`;

          resolved.utilities[cssSelector]![nestedLayoutVariable] = nestedValue;
        }
      } else {
        // Handle opacity values and other singular layout values
        const formattedValue =
          layoutVariablePrefix.includes('opacity') && typeof value === 'number'
            ? value.toString().replace(/^0\./, '.')
            : value;

        resolved.utilities[cssSelector]![layoutVariablePrefix] = formattedValue;
      }
    }
  }

  return resolved;
};

const corePlugin = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
  addCommonColors: boolean,
) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix);

  return plugin(
    ({ addBase, addUtilities, addVariant }) => {
      // add base classNames
      addBase({
        [':root, [data-theme]']: {
          ...baseStyles(prefix),
        },
      });
      // add the css variables to "@layer utilities"
      addUtilities({ ...resolved?.utilities, ...utilities });
      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
    },
    // extend the colors config
    {
      theme: {
        extend: {
          colors: {
            ...(addCommonColors ? commonColors : {}),
            ...resolved?.colors,
          },
          height: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          width: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          fontSize: {
            tiny: [`var(--${prefix}-font-size-tiny)`, `var(--${prefix}-line-height-tiny)`],
            small: [`var(--${prefix}-font-size-small)`, `var(--${prefix}-line-height-small)`],
            medium: [`var(--${prefix}-font-size-medium)`, `var(--${prefix}-line-height-medium)`],
            large: [`var(--${prefix}-font-size-large)`, `var(--${prefix}-line-height-large)`],
          },
          borderRadius: {
            small: `var(--${prefix}-radius-small)`,
            medium: `var(--${prefix}-radius-medium)`,
            large: `var(--${prefix}-radius-large)`,
          },
          opacity: {
            hover: `var(--${prefix}-hover-opacity)`,
            disabled: `var(--${prefix}-disabled-opacity)`,
          },
          boxShadow: {
            small: `var(--${prefix}-box-shadow-small)`,
            medium: `var(--${prefix}-box-shadow-medium)`,
            large: `var(--${prefix}-box-shadow-large)`,
          },
          transitionDuration: {
            250: '250ms',
            400: '400ms',
          },
          ...animations,
        },
      },
    },
  );
};

export const aliceui = (config: PluginConfig = {}): ReturnType<typeof plugin> => {
  const {
    themes: themeObject = {},
    defaultTheme = 'light',
    layout: userLayout,
    defaultExtendTheme = 'light',
    prefix: defaultPrefix = DEFAULT_PREFIX,
    addCommonColors = false,
  } = config;

  const userLightColors = get(themeObject, 'light.colors', {});
  const userDarkColors = get(themeObject, 'dark.colors', {});

  const defaultLayoutObj =
    userLayout && typeof userLayout === 'object'
      ? deepMerge(defaultLayout, userLayout)
      : defaultLayout;

  const baseLayouts = {
    light: {
      ...defaultLayoutObj,
      ...lightLayout,
    },
    dark: {
      ...defaultLayoutObj,
      ...darkLayout,
    },
  };

  // get other themes from the config different from light and dark
  const otherThemes = omit(themeObject, ['light', 'dark']) || {};

  forEach(otherThemes, ({ extend, colors, layout }, themeName) => {
    const baseTheme = extend && isBaseTheme(extend) ? extend : defaultExtendTheme;

    if (colors && typeof colors === 'object') {
      otherThemes[themeName].colors = deepMerge(semanticColors[baseTheme], colors);
    }
    if (layout && typeof layout === 'object') {
      otherThemes[themeName].layout = deepMerge(
        extend ? baseLayouts[extend] : defaultLayoutObj,
        layout,
      );
    }
  });

  const light: ConfigTheme = {
    layout: deepMerge(baseLayouts.light, get(themeObject, 'light.layout', {})),
    colors: deepMerge(semanticColors.light, userLightColors),
  };

  const dark = {
    layout: deepMerge(baseLayouts.dark, get(themeObject, 'dark.layout', {})),
    colors: deepMerge(semanticColors.dark, userDarkColors),
  };

  const themes = {
    light,
    dark,
    ...otherThemes,
  };

  return corePlugin(themes, defaultTheme, defaultPrefix, addCommonColors);
};

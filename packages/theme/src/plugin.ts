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

// @internal
const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
) => {
  const resolved: {
    variants: { name: string; definition: string[] }[];
    utilities: Record<string, Record<string, any>>;
    colors: Record<
      string,
      ({
        opacityValue,
        opacityVariable,
      }: {
        opacityValue: string;
        opacityVariable: string;
      }) => string
    >;
  } = {
    variants: [],
    utilities: {},
    colors: {},
  };

  forEach(themes, ({ extend, layout, colors }: ConfigTheme, themeName: string) => {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`;
    const scheme = themeName === 'light' || themeName === 'dark' ? themeName : extend;

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    resolved.utilities[cssSelector] = scheme
      ? {
          'color-scheme': scheme,
        }
      : {};

    // flatten color definitions
    const flatColors = flattenThemeObject(colors);

    const flatLayout = layout ? mapKeys(layout, (value, key) => kebabCase(key)) : {};

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });

    /**
     * Colors
     */
    forEach(flatColors, (colorValue, colorName) => {
      if (!colorValue) return;

      try {
        const [h, s, l, defaultAlphaValue] = Color(colorValue).hsl().round().array();
        const nextuiColorVariable = `--${prefix}-${colorName}`;

        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![nextuiColorVariable] = `${h} ${s}% ${l}%`;

        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = ({ opacityVariable, opacityValue }) => {
          // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
          if (!isNaN(+opacityValue)) {
            return `hsl(var(${nextuiColorVariable}) / ${opacityValue})`;
          }
          // if no opacityValue was provided (=it is not parsable to a number)
          // the nextuiOpacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
          // over the tw class based opacity(e.g. "bg-opacity-90")
          // This is how tailwind behaves as for v3.2.4
          if (opacityVariable) {
            return `hsl(var(${nextuiColorVariable}) / var(${opacityVariable}))`;
          }

          return `hsl(var(${nextuiColorVariable}))`;
        };
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error', error?.message);
      }
    });

    /**
     * Layout
     */
    forEach(flatLayout, (value, key) => {
      if (!value) return;

      if (typeof value === 'object') {
        forEach(value, (v, k) => {
          const layoutVariable = `--${prefix}-${key}-${k}`;

          resolved.utilities[cssSelector]![layoutVariable] = v;
        });
      } else {
        const layoutVariable = `--${prefix}-${key}`;

        resolved.utilities[cssSelector]![layoutVariable] = value;
      }
    });
  });

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
      addUtilities({ ...resolved.utilities, ...utilities });
      resolved.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
    },
    // extend the colors config
    {
      theme: {
        extend: {
          colors: {
            ...(addCommonColors ? commonColors : {}),
            ...resolved.colors,
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
  let otherThemes = omit(themeObject, ['light', 'dark']) || {};

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

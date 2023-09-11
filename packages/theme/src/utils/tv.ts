import type { TV, VariantProps } from 'tailwind-variants';
import { tv as tvBase } from 'tailwind-variants';

const COMMON_UNITS = ['small', 'medium', 'large'];

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: config?.twMerge ?? true,
    twMergeConfig: {
      ...config?.twMergeConfig,
      theme: {
        ...config?.twMergeConfig?.theme,
        opacity: ['disabled'],
        borderWidth: COMMON_UNITS,
        borderRadius: COMMON_UNITS,
      },
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        shadow: [{ shadow: COMMON_UNITS }],
        'font-size': [{ text: ['tiny', ...COMMON_UNITS] }],
      },
    },
  });

export type { TV, VariantProps };

export const filterVariantProps = <T extends Record<string, any>, K extends keyof T>(
  props: T,
  variantKeys?: K[],
): Pick<T, K> | object => {
  if (!variantKeys) {
    return {};
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return { ...acc, [key]: props[key] };
    } else {
      return acc;
    }
  }, {});

  return picked;
};

export const attributes = {
  boolean: [
    ['hover', 'hovered'],
    ['focus', 'focused'],
    'focus-visible',
    'focus-within',
    'pressed',
    'disabled',
    'drop-target',
    'dragging',
    'empty',
    'allows-dragging',
    'allows-removing',
    'allows-sorting',
    ['placeholder-shown', 'placeholder'],
    'selected',
    'indeterminate',
    ['read-only', 'readonly'],
    'required',
    'entering',
    'exiting',
    'open',
    'unavailable',
    'outside-month',
    'outside-visible-range',
    'selection-start',
    'selection-end',
    'current',
    'invalid',
    'resizing',
  ],
  enum: {
    placement: ['left', 'right', 'top', 'bottom'],
    type: ['literal', 'year', 'month', 'day'],
    layout: ['grid', 'stack'],
    orientation: ['horizontal', 'vertical'],
    'selection-mode': ['single', 'multiple'],
    'resizable-direction': ['right', 'left', 'both'],
    'sort-direction': ['ascending', 'descending'],
  },
};

export type AttributeName = keyof typeof attributes.enum;

export const shortNames = {
  'selection-mode': 'selection',
  'resizable-direction': 'resizable',
  'sort-direction': 'sort',
};

// Variants we use that are already defined by Tailwind:
// https://github.com/tailwindlabs/tailwindcss/blob/a2fa6932767ab328515f743d6188c2164ad2a5de/src/corePlugins.js#L84
export const nativeVariants = [
  'indeterminate',
  'required',
  'invalid',
  'empty',
  'focus-visible',
  'focus-within',
  'disabled',
];
// @ts-ignore
export const nativeVariantSelectors = new Map([
  ...nativeVariants.map((variant) => [variant, `:${variant}`]),
  ['hovered', ':hover'],
  ['focused', ':focus'],
  ['readonly', ':read-only'],
  ['open', '[open]'],
  ['placeholder', ':placeholder-shown'],
]);

// If no prefix is specified, we want to avoid overriding native variants on non-RAC components, so we only target elements with the data-rac attribute for those variants.
export const getSelector = (prefix: string, attributeName: string, attributeValue?: string) => {
  let baseSelector = attributeValue
    ? `[data-${attributeName}="${attributeValue}"]`
    : `[data-${attributeName}]`;
  if (prefix === '' && nativeVariantSelectors.has(attributeName)) {
    return `&:is([data-rac]${baseSelector}, :not([data-rac])${nativeVariantSelectors.get(
      attributeName,
    )})`;
  } else {
    return `&${baseSelector}`;
  }
};

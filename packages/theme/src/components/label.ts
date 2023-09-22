import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils/tv';

/**
 * Label wrapper **Tailwind Variants** component
 *
 * @example
 * <label className={label({ color: "secondary" })} />
 */
const label = tv({
  base: ['relative inline-flex items-center outline-none tap-highlight-transparent'],
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    color: {
      foreground: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    color: 'foreground',
    size: 'md',
  },
});

export type LabelVariantProps = VariantProps<typeof label>;

export { label };

import type { VariantProps } from 'tailwind-variants';
import { dataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

/**
 * Link wrapper **Tailwind Variants** component
 *
 * @example
 * <a className={link({ color: "secondary", isBlock: true })} href="#" />
 */
const link = tv({
  base: [
    'relative inline-flex items-center outline-hidden tap-highlight-transparent',
    // disabled
    'data-[disabled=true]:opacity-disabled',
    'data-[disabled=true]:pointer-events-none',
    // focus ring
    ...dataFocusVisibleClasses,
  ],
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
    color: {
      foreground: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
    underline: {
      none: 'no-underline',
      hover: 'hover:underline',
      always: 'underline',
      active: 'active:underline',
      focus: 'focus:underline',
    },
    isBlock: {
      true: [
        'px-2',
        'py-1',
        'hover:after:opacity-100',
        "after:content-['']",
        'after:inset-0',
        'after:opacity-0',
        'after:w-full',
        'after:h-full',
        'after:rounded-xl',
        'after:transition-background',
        'after:absolute',
      ],
      false: 'hover:opacity-80 active:opacity-50 transition-opacity',
    },
  },
  compoundVariants: [
    {
      isBlock: true,
      color: 'foreground',
      class: 'hover:after:bg-foreground/10',
    },
    {
      isBlock: true,
      color: 'primary',
      class: 'hover:after:bg-primary/20',
    },
    {
      isBlock: true,
      color: 'secondary',
      class: 'hover:after:bg-secondary/20',
    },
    {
      isBlock: true,
      color: 'success',
      class: 'hover:after:bg-success/20',
    },
    {
      isBlock: true,
      color: 'warning',
      class: 'hover:after:bg-warning/20',
    },
    {
      isBlock: true,
      color: 'danger',
      class: 'hover:after:bg-danger/20',
    },
    {
      underline: ['hover', 'always', 'active', 'focus'],
      class: 'underline-offset-4',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
    isBlock: false,
    underline: 'none',
  },
});

export type LinkVariantProps = VariantProps<typeof link>;

export { link };

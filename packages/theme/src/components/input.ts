import type { VariantProps } from 'tailwind-variants';

import { dataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

/**
 * Input wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, input, clearButton} = input({...})
 *
 * <div className={base())}>
 *    <input className={input()}/>
 *    <button className={clearButton()}>Clear</button>
 * </div>
 * ```
 */
const input = tv({
  slots: {
    base: [
      'group',
      'inline-flex ',
      'flex-row',
      'items-center',
      'relative',
      'px-3',
      'gap-3',
      'shadow-sm',
      'tap-highlight-transparent',
      'transition-background',
      '!duration-150',
      'motion-reduce:transition-none',
      // state
      'data-[disabled=true]:opacity-disabled',
      'data-[disabled=true]:pointer-events-none',
    ],
    input: [
      'w-full',
      'h-full',
      'font-normal',
      '!bg-transparent',
      'outline-none',
      'placeholder:text-foreground-500',
      // state
      'data-[invalid=true]:text-danger',
      'data-[invalid=true]:placeholder:text-danger',
    ],
    clearButton: [
      'p-2',
      '-m-2',
      'z-10',
      'hidden',
      'absolute',
      'right-3',
      'appearance-none',
      'outline-none',
      'select-none',
      'opacity-0',
      'hover:!opacity-100',
      'cursor-pointer',
      'active:!opacity-70',
      'rounded-full',
      'transition-opacity',
      'motion-reduce:transition-none',
      // focus ring
      ...dataFocusVisibleClasses,
    ],
  },
  variants: {
    variant: {
      flat: {
        base: [
          'bg-default-100',
          'data-[hovered=true]:bg-default-200',
          'data-[focused=true]:bg-default-100',
          'data-[invalid=true]:bg-danger-50',
          'group-data-[invalid=true]:group-data-[hovered=true]:bg-danger-100',
          'data-[invalid=true]:data-[focused=true]:bg-danger-50',
          ...dataFocusVisibleClasses,
        ],
      },
      faded: {
        base: [
          'bg-default-100',
          'border-2',
          'border-default-200',
          'data-[hovered=true]:border-default-400',
          'transition-colors',
          'motion-reduce:transition-none',
          ...dataFocusVisibleClasses,
        ],
      },
      bordered: {
        base: [
          'border-2',
          'border-default-200',
          'data-[hovered=true]:border-default-400',
          'data-[focused=true]:border-foreground',
          'transition-colors',
          'motion-reduce:transition-none',
          'data-[invalid=true]:!border-danger',
        ],
      },
      underlined: {
        base: [
          '!px-1',
          '!pb-0',
          '!gap-0',
          'relative',
          'box-border',
          'border-b-2',
          'shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]',
          'border-default-200',
          '!rounded-none',
          'hover:border-default-300',
          "after:content-['']",
          'after:w-0',
          'after:origin-center',
          'after:bg-foreground',
          'after:absolute',
          'after:left-1/2',
          'after:-translate-x-1/2',
          'after:-bottom-[2px]',
          'after:h-[2px]',
          'data-[focused=true]:after:w-full',
          'data-[invalid=true]:after:bg-danger',
          'after:transition-width',
          'motion-reduce:after:transition-none',
        ],
      },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      xs: {
        base: ['h-7', 'min-h-[1.75rem]', 'px-1.5', 'rounded-[6px]'],
        input: 'text-sm',
      },
      sm: {
        base: ['h-8', 'min-h-[2rem]', 'px-2', 'rounded-small'],
        input: 'text-sm',
      },
      md: {
        base: ['h-10', 'min-h-[2.5rem]', 'px-3', 'rounded-medium'],
        input: 'text-base',
      },
      lg: {
        base: ['h-12', 'min-h-[3rem]', 'px-4', 'rounded-large'],
        input: 'text-lg',
      },
    },
    radius: {
      none: {
        base: 'rounded-none',
      },
      xs: {
        base: 'rounded-[6px]',
      },
      sm: {
        base: 'rounded-small',
      },
      md: {
        base: 'rounded-medium',
      },
      lg: {
        base: 'rounded-large',
      },
      full: {
        base: 'rounded-full',
      },
    },
    fullWidth: {
      true: {
        base: 'w-full',
      },
    },
    isClearable: {
      true: {
        input: 'peer pr-6',
        clearButton: 'peer-data-[filled=true]:opacity-70 peer-data-[filled=true]:block',
      },
    },
    isMultiline: {
      true: {
        base: '!h-auto',
        input: 'resize-none py-2',
      },
    },
  },
  defaultVariants: {
    variant: 'bordered',
    color: 'default',
    size: 'md',
    fullWidth: true,
  },
  compoundVariants: [
    // faded & color
    {
      variant: 'faded',
      color: 'primary',
      class: {
        base: 'data-[hovered=true]:border-primary focus-within:border-primary',
      },
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: {
        base: 'data-[hovered=true]:border-secondary focus-within:border-secondary',
      },
    },
    {
      variant: 'faded',
      color: 'success',
      class: {
        base: 'data-[hovered=true]:border-success focus-within:border-success',
      },
    },
    {
      variant: 'faded',
      color: 'warning',
      class: {
        base: 'data-[hovered=true]:border-warning focus-within:border-warning',
      },
    },
    {
      variant: 'faded',
      color: 'danger',
      class: {
        base: 'data-[hovered=true]:border-danger focus-within:border-danger',
      },
    },
    // underlined & color
    {
      variant: 'underlined',
      color: 'primary',
      class: {
        base: 'after:bg-primary',
      },
    },
    {
      variant: 'underlined',
      color: 'secondary',
      class: {
        base: 'after:bg-secondary',
      },
    },
    {
      variant: 'underlined',
      color: 'success',
      class: {
        base: 'after:bg-success',
      },
    },
    {
      variant: 'underlined',
      color: 'warning',
      class: {
        base: 'after:bg-warning',
      },
    },
    {
      variant: 'underlined',
      color: 'danger',
      class: {
        base: 'after:bg-danger',
      },
    },
    // bordered & color
    {
      variant: 'bordered',
      color: 'primary',
      class: {
        base: 'data-[focused=true]:!border-primary',
      },
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: {
        base: 'data-[focused=true]:!border-secondary',
      },
    },
    {
      variant: 'bordered',
      color: 'success',
      class: {
        base: 'data-[focused=true]:!border-success',
      },
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: {
        base: 'data-[focused=true]:!border-warning',
      },
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: {
        base: 'data-[focused=true]:!border-danger',
      },
    },
    // radius-full & size
    {
      radius: 'full',
      size: ['xs'],
      class: {
        base: 'px-2.5',
      },
    },
    {
      radius: 'full',
      size: ['sm'],
      class: {
        base: 'px-3',
      },
    },
    {
      radius: 'full',
      size: 'md',
      class: {
        base: 'px-4',
      },
    },
    {
      radius: 'full',
      size: 'lg',
      class: {
        base: 'px-5',
      },
    },
  ],
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputSlots = keyof ReturnType<typeof input>;

export { input };

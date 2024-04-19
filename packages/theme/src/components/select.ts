import type { VariantProps } from 'tailwind-variants';
import { dataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

const select = tv({
  slots: {
    base: [
      'group',
      'flex',
      'flex-col',
      'relative',
      'w-full',
      'transition-opacity',
      'duration-200',
      'motion-reduce:transition-none',
      'data-[disabled=true]:opacity-disabled',
      'data-[disabled=true]:pointer-events-none',
    ],
    label: [
      'block',
      'text-sm',
      'font-medium',
      'pb-1.5',
      'text-foreground',
      'pointer-events-none',
      'group-data-[invalid=true]:!text-danger',
      "group-data-[required=true]:after:content-['*']",
      'group-data-[required=true]:after:text-danger',
      'group-data-[required=true]:after:ml-0.5',
    ],
    mainWrapper: 'w-full flex flex-col',
    trigger: [
      'relative',
      'px-3',
      'gap-3',
      'w-full',
      'inline-flex',
      'flex-row',
      'items-center',
      'shadow-sm',
      'outline-none',
      'tap-highlight-transparent',
      'data-[disabled=true]:pointer-events-none',
    ],
    value: 'font-normal opacity-100 data-[placeholder=true]:opacity-60',
    spinner: ['absolute', 'right-3', 'rtl:left-3', 'rtl:right-[unset]'],
    selectorIcon: [
      'absolute',
      'right-3',
      'rtl:left-3',
      'rtl:right-[unset]',
      'w-4',
      'h-4',
      'group-data-[invalid=true]:text-danger',
    ],
    popover: [
      'p-1',
      'overflow-hidden',
      'min-w-[--trigger-width]',
      'bg-content1',
      'shadow-medium',
      'rounded-large',
      'z-10',
      'relative',
      'inline-flex',
      'flex-col',
      'items-center',
      'justify-center',
      'box-border',
      'subpixel-antialiased',
      'outline-none',
      'box-border',
      // top
      'data-[placement=top]:[--popover-origin:translateY(8px)]',
      // bottom
      'data-[placement=bottom]:[--popover-origin:translateY(-8px)]',
      // left
      'data-[placement=left]:[--popover-origin:translateX(8px)]',
      // right
      'data-[placement=right]:[--popover-origin:translateX(-8px)]',
      // animate
      'data-[entering=true]:animate-[popover_0.2s]',
      'data-[exiting=true]:animate-[popover_0.2s_ease-in_reverse]',
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    description: 'px-1 pt-1.5 text-xs text-foreground-400',
    errorMessage: 'px-1 pt-1.5 text-xs text-danger',
  },
  variants: {
    variant: {
      flat: {
        trigger: [
          'bg-default-100',
          'data-[hovered=true]:bg-default-200',
          'group-data-[invalid=true]:bg-danger-50',
          'group-data-[invalid=true]:data-[hovered=true]:bg-danger-100',
        ],
      },
      faded: {
        trigger: [
          'bg-default-100',
          'border-2',
          'border-default-200',
          'transition-colors',
          'motion-reduce:transition-none',
          'data-[hovered=true]:border-default-400',
        ],
      },
      bordered: {
        trigger: [
          'border-2',
          'border-default-200',
          'transition-colors',
          'motion-reduce:transition-none',
          'data-[hovered=true]:border-default-400',
          'group-data-[open=true]:border-foreground',
          'group-data-[focused=true]:border-foreground',
          'group-data-[invalid=true]:!border-danger',
        ],
      },
      underlined: {
        trigger: [
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
          'after:transition-width',
          'motion-reduce:after:transition-none',
          'group-data-[open=true]:after:w-full',
          'group-data-[focused=true]:after:w-full',
          'group-data-[invalid=true]:after:bg-danger',
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
      sm: {
        label: 'text-xs',
        trigger: 'h-8 min-h-[32px] px-2 rounded-small',
        value: 'text-sm',
      },
      md: {
        trigger: 'h-10 min-h-[40px] rounded-medium',
        value: 'text-sm',
      },
      lg: {
        trigger: 'h-12 min-h-[48px] rounded-large',
        value: 'text-base',
      },
    },
    radius: {
      none: {
        trigger: 'rounded-none',
      },
      sm: {
        trigger: 'rounded-small',
      },
      md: {
        trigger: 'rounded-medium',
      },
      lg: {
        trigger: 'rounded-large',
      },
      full: {
        trigger: 'rounded-full',
      },
    },
  },
  defaultVariants: {
    variant: 'flat',
    color: 'default',
    size: 'md',
  },
  compoundVariants: [
    // faded & color
    {
      variant: 'faded',
      color: 'primary',
      class: {
        trigger: ['data-[hovered=true]:border-primary', 'data-[pressed=true]:border-primary'],
        label: 'text-primary',
      },
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: {
        trigger: ['data-[hovered=true]:border-secondary', 'data-[pressed=true]:border-secondary'],
        label: 'text-secondary',
      },
    },
    {
      variant: 'faded',
      color: 'success',
      class: {
        trigger: ['data-[hovered=true]:border-success', 'data-[pressed=true]:border-success'],
        label: 'text-success',
      },
    },
    {
      variant: 'faded',
      color: 'warning',
      class: {
        trigger: ['data-[hovered=true]:border-warning', 'data-[pressed=true]:border-warning'],
        label: 'text-warning',
      },
    },
    {
      variant: 'faded',
      color: 'danger',
      class: {
        trigger: ['data-[hovered=true]:border-danger', 'data-[pressed=true]:border-danger'],
        label: 'text-danger',
      },
    },
    // underlined & color
    {
      variant: 'underlined',
      color: 'primary',
      class: {
        trigger: 'after:bg-primary',
        label: 'text-primary',
      },
    },
    {
      variant: 'underlined',
      color: 'secondary',
      class: {
        trigger: 'after:bg-secondary',
        label: 'text-secondary',
      },
    },
    {
      variant: 'underlined',
      color: 'success',
      class: {
        trigger: 'after:bg-success',
        label: 'text-success',
      },
    },
    {
      variant: 'underlined',
      color: 'warning',
      class: {
        trigger: 'after:bg-warning',
        label: 'text-warning',
      },
    },
    {
      variant: 'underlined',
      color: 'danger',
      class: {
        trigger: 'after:bg-danger',
        label: 'text-danger',
      },
    },
    // bordered & color
    {
      variant: 'bordered',
      color: 'primary',
      class: {
        trigger: [
          'group-data-[open=true]:border-primary',
          'group-data-[focused=true]:border-primary',
        ],
        label: 'text-primary',
      },
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: {
        trigger: [
          'group-data-[open=true]:border-secondary',
          'group-data-[focused=true]:border-secondary',
        ],
        label: 'text-secondary',
      },
    },
    {
      variant: 'bordered',
      color: 'success',
      class: {
        trigger: [
          'group-data-[open=true]:border-success',
          'group-data-[focused=true]:border-success',
        ],
        label: 'text-success',
      },
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: {
        trigger: [
          'group-data-[open=true]:border-warning',
          'group-data-[focused=true]:border-warning',
        ],
        label: 'text-warning',
      },
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: {
        trigger: [
          'group-data-[open=true]:border-danger',
          'group-data-[focused=true]:border-danger',
        ],
        label: 'text-danger',
      },
    },
    // radius-full & size
    {
      radius: 'full',
      size: ['sm'],
      class: {
        trigger: 'px-3',
      },
    },
    {
      radius: 'full',
      size: 'md',
      class: {
        trigger: 'px-4',
      },
    },
    {
      radius: 'full',
      size: 'lg',
      class: {
        trigger: 'px-5',
      },
    },
    // flat & faded
    {
      variant: ['flat', 'faded'],
      class: {
        trigger: [
          // focus ring
          ...dataFocusVisibleClasses,
        ],
      },
    },
  ],
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export { select };

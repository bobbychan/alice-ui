import type { VariantProps } from 'tailwind-variants';

import { groupDataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

/**
 * Checkbox wrapper **Tailwind Variants** component
 *
 * const {base, control, icon, label} = checkbox({...})
 *
 * @example
 * <label className={base())}>
 *  // hidden input
 *  <span className={control()} aria-hidden="true" data-selected={selected}>
 *     <svg className={icon()}>
 *       // check icon
 *     </svg>
 *  </span>
 *  <span className={label()}>Label</span>
 * </label>
 */
const checkbox = tv({
  slots: {
    base: [
      'group',
      'relative',
      'max-w-fit',
      'inline-flex',
      'items-center',
      'justify-start',
      'cursor-pointer',
      'tap-highlight-transparent',
      'p-2',
      '-m-2',
      'data-[disabled=true]:opacity-disabled',
      'data-[disabled=true]:pointer-events-none',
    ],
    control: [
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'shrink-0',
      'overflow-hidden',
      // border
      'border-solid',
      'border-2',
      'border-default',
      '!duration-200',
      'transition-transform-colors',
      'motion-reduce:transition-none',
      // state
      'group-data-[hovered=true]:bg-default-100',
      'group-data-[pressed=true]:scale-95',
      'group-data-[invalid=true]:border-danger',
      // focus ring
      ...groupDataFocusVisibleClasses,
    ],
    icon: [
      'z-10',
      'w-4',
      'h-3',
      'opacity-0',
      'group-data-[selected=true]:opacity-100',
      'transition-opacity',
      'motion-reduce:transition-none',
    ],
    label: [
      'relative',
      'ml-2',
      'text-foreground',
      'select-none',
      'transition-colors',
      'motion-reduce:transition-none',
      'group-data-[invalid=true]:text-danger',
    ],
  },
  variants: {
    color: {
      default: {
        control: [
          'group-data-[selected=true]:bg-default',
          'group-data-[selected=true]:text-default-foreground',
          'group-data-[selected=true]:border-default',
        ],
      },
      primary: {
        control: [
          'group-data-[selected=true]:bg-primary',
          'group-data-[selected=true]:text-primary-foreground',
          'group-data-[selected=true]:border-primary',
        ],
      },
      secondary: {
        control: [
          'group-data-[selected=true]:bg-secondary',
          'group-data-[selected=true]:text-secondary-foreground',
          'group-data-[selected=true]:border-secondary',
        ],
      },
      success: {
        control: [
          'group-data-[selected=true]:bg-success',
          'group-data-[selected=true]:text-success-foreground',
          'group-data-[selected=true]:border-success',
        ],
      },
      warning: {
        control: [
          'group-data-[selected=true]:bg-warning',
          'group-data-[selected=true]:text-warning-foreground',
          'group-data-[selected=true]:border-warning',
        ],
      },
      danger: {
        control: [
          'group-data-[selected=true]:bg-danger',
          'group-data-[selected=true]:text-danger-foreground',
          'group-data-[selected=true]:border-danger',
        ],
      },
    },
    size: {
      sm: {
        control: ['w-4 h-4', 'rounded-[calc(theme(borderRadius.medium)*0.5)]'],
        label: 'text-sm',
        icon: 'w-3 h-2',
      },
      md: {
        control: ['w-5 h-5', 'rounded-[calc(theme(borderRadius.medium)*0.6)]'],
        label: 'text-medium',
        icon: 'w-4 h-3',
      },
      lg: {
        control: ['w-6 h-6', 'rounded-[calc(theme(borderRadius.medium)*0.7)]'],
        label: 'text-lg',
        icon: 'w-5 h-4',
      },
    },
    radius: {
      none: {
        control: 'rounded-none',
      },
      sm: {
        control: ['rounded-[calc(theme(borderRadius.medium)*0.5)]'],
      },
      md: {
        control: ['rounded-[calc(theme(borderRadius.medium)*0.6)]'],
      },
      lg: {
        control: ['rounded-[calc(theme(borderRadius.medium)*0.7)]'],
      },
      full: {
        control: 'rounded-full',
      },
    },
    lineThrough: {
      true: {
        label: [
          'inline-flex',
          'items-center',
          'justify-center',
          "before:content-['']",
          'before:absolute',
          'before:bg-foreground',
          'before:w-0',
          'before:h-0.5',
          'group-data-[selected=true]:opacity-60',
          'group-data-[selected=true]:before:w-full',
        ],
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    lineThrough: false,
  },
});

/**
 * CheckboxGroup control **Tailwind Variants** component
 *
 * const {base, label, control} = checkboxGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={control()} data-orientation="vertical/horizontal">
 *     // checkboxes
 *  </div>
 * </div>
 */
const checkboxGroup = tv({
  slots: {
    base: ['group', 'relative', 'flex', 'flex-col', 'gap-2'],
    label: [
      'relative',
      'text-md',
      'text-foreground-500',
      "group-data-[required=true]:after:content-['*']",
      'group-data-[required=true]:after:text-danger',
      'group-data-[required=true]:after:ml-0.5',
    ],
    wrapper: ['flex', 'flex-col', 'flex-wrap', 'gap-2', 'data-[orientation=horizontal]:flex-row'],
    description: [
      'text-sm',
      'text-foreground-400',
      'transition-colors',
      '!duration-150',
      'motion-reduce:transition-none',
      'group-data-[invalid=true]:text-danger',
    ],
    errorMessage: ['text-sm', 'text-danger'],
  },
});

export type CheckboxGroupSlots = keyof ReturnType<typeof checkboxGroup>;

export type CheckboxVariantProps = VariantProps<typeof checkbox>;
export type CheckboxSlots = keyof ReturnType<typeof checkbox>;

export { checkbox, checkboxGroup };

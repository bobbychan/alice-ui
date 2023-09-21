import type { VariantProps } from 'tailwind-variants';

import { groupDataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

/**
 * Toggle (Switch) wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, thumb, thumbIcon, label} = toggle({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-selected={true/false}
 *    data-pressed={true/false}
 *    data-focus={true/false}
 *    data-hovered={true/false}
 *    data-focus-visible={true/false}
 * >
 *  <input/> // hidden input
 *  <span className={wrapper()} aria-hidden="true">
 *    <span className={thumb()}>
 *      <svg className={thumbIcon()}>...</svg>
 *    </span>
 *  </span>
 *  <span className={label()}>Label</span>
 * </label>
 */
const toggle = tv({
  slots: {
    base: [
      'group',
      'relative',
      'max-w-fit',
      'inline-flex',
      'items-center',
      'justify-start',
      'cursor-pointer',
      'touch-none',
      'tap-highlight-transparent',
      'data-[disabled=true]:opacity-disabled',
      'data-[disabled=true]:pointer-events-none',
    ],
    wrapper: [
      'px-1',
      'relative',
      'inline-flex',
      'items-center',
      'justify-start',
      'flex-shrink-0',
      'overflow-hidden',
      'bg-default-200',
      'rounded-full',
      'transition-background',
      'motion-reduce:transition-none',
      // focus ring
      ...groupDataFocusVisibleClasses,
    ],
    thumb: [
      'z-10',
      'flex',
      'items-center',
      'justify-center',
      'bg-white',
      'shadow-small',
      'rounded-full',
      'origin-right',
      'transition-all',
      'motion-reduce:transition-none',
    ],
    thumbIcon: 'text-black',
    label: 'relative ml-2 text-foreground select-none',
  },
  variants: {
    color: {
      default: {
        wrapper: [
          'group-data-[selected=true]:bg-default-400',
          'group-data-[selected=true]:text-default-foreground',
        ],
      },
      primary: {
        wrapper: [
          'group-data-[selected=true]:bg-primary',
          'group-data-[selected=true]:text-primary-foreground',
        ],
      },
      secondary: {
        wrapper: [
          'group-data-[selected=true]:bg-secondary',
          'group-data-[selected=true]:text-secondary-foreground',
        ],
      },
      success: {
        wrapper: [
          'group-data-[selected=true]:bg-success',
          'group-data-[selected=true]:text-success-foreground',
        ],
      },
      warning: {
        wrapper: [
          'group-data-[selected=true]:bg-warning',
          'group-data-[selected=true]:text-warning-foreground',
        ],
      },
      danger: {
        wrapper: [
          'group-data-[selected=true]:bg-danger',
          'data-[selected=true]:text-danger-foreground',
        ],
      },
    },
    size: {
      sm: {
        wrapper: 'w-10 h-6',
        thumb: [
          'w-4 h-4 text-xs',
          //selected
          'group-data-[selected=true]:ml-4',
        ],
        label: 'text-sm',
      },
      md: {
        wrapper: 'w-12 h-7',
        thumb: [
          'w-5 h-5 text-sm',
          //selected
          'group-data-[selected=true]:ml-5',
        ],
        label: 'text-base',
      },
      lg: {
        wrapper: 'w-14 h-8',
        thumb: [
          'w-6 h-6 text-base',
          //selected
          'group-data-[selected=true]:ml-6',
        ],
        label: 'text-lg',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      size: 'sm',
      class: {
        thumb: ['group-data-[pressed=true]:w-5', 'group-data-[selected]:group-data-[pressed]:ml-3'],
      },
    },
    {
      size: 'md',
      class: {
        thumb: ['group-data-[pressed=true]:w-6', 'group-data-[selected]:group-data-[pressed]:ml-4'],
      },
    },
    {
      size: 'lg',
      class: {
        thumb: ['group-data-[pressed=true]:w-7', 'group-data-[selected]:group-data-[pressed]:ml-5'],
      },
    },
  ],
});

export type ToggleVariantProps = VariantProps<typeof toggle>;
export type ToggleSlots = keyof ReturnType<typeof toggle>;

export { toggle };

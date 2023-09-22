import type { VariantProps } from 'tailwind-variants';

import { groupDataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

/**
 * Radio wrapper **Tailwind Variants** component
 *
 * const {base, control, point, label, description} = radio({...})
 *
 * @example
 * <label
 *    className={base())}
 *    data-selected={boolean}
 *    data-pressed={boolean}
 *    data-hovered={boolean}
 *    data-focused={boolean}
 *    data-focus-visible={boolean}
 *    data-disabled={boolean}
 * >
 *  // input
 *  <span className={control()} aria-hidden="true" data-selected={selected}>
 *     <span className={point()}/>
 *  </span>
 *  <div className={labelWrapper()}>
 *    <span className={label()}>Label</span>
 *    <span className={description()}>Description</span>
 *  </div>
 * </label>
 */
const radio = tv({
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
      'box-border',
      'border-default',
      'rounded-full',
      'transition-transform-colors',
      'motion-reduce:transition-none',
      // state
      'group-data-[pressed=true]:scale-95',
      'group-data-[invalid=true]:border-danger',
      'group-data-[invalid=true]:group-data-[selected=true]:border-danger',
      // focus ring
      ...groupDataFocusVisibleClasses,
    ],
    point: [
      'z-10',
      'w-2',
      'h-2',
      'origin-center',
      'rounded-full',
      'opacity-0',
      'scale-0',
      'transition-transform-opacity',
      'motion-reduce:transition-none',
      // state
      'group-data-[selected=true]:opacity-100',
      'group-data-[selected=true]:scale-100',
      'group-data-[invalid=true]:bg-danger',
      'group-data-[invalid=true]:text-danger-foreground',
    ],
    label: [
      'relative',
      'ml-2',
      'text-foreground',
      'select-none',
      'ransition-colors',
      'motion-reduce:transition-none',
      'group-data-[invalid=true]:text-danger',
    ],
  },
  variants: {
    color: {
      default: {
        point: 'bg-default-500 text-default-foreground',
        control: 'group-data-[selected=true]:border-default-500',
      },
      primary: {
        point: 'bg-primary text-primary-foreground',
        control: 'group-data-[selected=true]:border-primary',
      },
      secondary: {
        point: 'bg-secondary text-secondary-foreground',
        control: 'group-data-[selected=true]:border-secondary',
      },
      success: {
        point: 'bg-success text-success-foreground',
        control: 'group-data-[selected=true]:border-success',
      },
      warning: {
        point: 'bg-warning text-warning-foreground',
        control: 'group-data-[selected=true]:border-warning',
      },
      danger: {
        point: 'bg-danger text-danger-foreground',
        control: 'group-data-[selected=true]:border-danger',
      },
    },
    size: {
      sm: {
        control: 'w-4 h-4',
        point: 'w-1.5 h-1.5',
        label: 'text-sm',
      },
      md: {
        control: 'w-5 h-5',
        point: 'w-2 h-2',
        label: 'text-md',
      },
      lg: {
        control: 'w-6 h-6',
        point: 'w-2.5 h-2.5',
        label: 'text-lg',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

/**
 * RadioGroup wrapper **Tailwind Variants** component
 *
 * const {base, label, wrapper} = radioGroup({...})
 *
 * @example
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={wrapper()} data-orientation="vertical/horizontal">
 *     // radios
 *  </div>
 * </div>
 */
const radioGroup = tv({
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
    wrapper: [
      'flex',
      'flex-col',
      'flex-wrap',
      'gap-2',
      'group-data-[orientation=horizontal]:flex-row',
    ],
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

export type RadioGroupSlots = keyof ReturnType<typeof radioGroup>;

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioSlots = keyof ReturnType<typeof radio>;

export { radio, radioGroup };

import type { VariantProps } from 'cva';
import { colorVariants, dataFocusVisibleClasses } from '../utils';
import { cva } from '../utils/cva';

/**
 * Button component
 *
 * const styles = button({...})
 *
 * @example
 * <button
 *  className={styles())}
 *  data-disabled={true/false}
 *  data-pressed={true/false}
 *  data-hovered={true/false}
 *  data-focused={true/false}
 *  data-focus-visible={true/false}
 * >
 *   Button
 * </button>
 */

const button = cva({
  base: [
    'z-0',
    'group',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'box-border',
    'appearance-none',
    'outline-none',
    'select-none',
    'whitespace-nowrap',
    'min-w-max',
    'font-normal',
    'subpixel-antialiased',
    'overflow-hidden',
    'tap-highlight-transparent',
    // focus ring
    ...dataFocusVisibleClasses,
  ],
  variants: {
    variant: {
      solid: '',
      bordered: 'border-2 bg-transparent',
      light: 'bg-transparent',
      flat: '',
      faded: 'border-2',
      shadow: '',
      ghost: 'border-2 bg-transparent',
    },
    size: {
      sm: 'px-3 min-w-[4rem] h-8 text-xs gap-2 rounded-[6px]',
      md: 'px-4 min-w-[5rem] h-10 text-sm gap-2 rounded-[8px]',
      lg: 'px-6 min-w-[6rem] h-12 text-base gap-3 rounded-[12px]',
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      danger: '',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-[6px]',
      md: 'rounded-[8px]',
      lg: 'rounded-[12px]',
      full: 'rounded-full',
    },
    fullWidth: {
      true: 'w-full',
    },
    isDisabled: {
      true: 'opacity-50 pointer-events-none',
    },
    isInGroup: {
      true: '[&:not(:first-child):not(:last-child)]:rounded-none',
    },
    isIconOnly: {
      true: 'px-0 !gap-0',
      false: '[&>svg]:max-w-[2rem]',
    },
    disableAnimation: {
      true: '!transition-none',
      false: 'active:scale-[0.97] transition-transform-colors motion-reduce:transition-none',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'default',
    fullWidth: false,
    isDisabled: false,
    isInGroup: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: 'solid',
      color: 'default',
      class: colorVariants.solid.default,
    },
    {
      variant: 'solid',
      color: 'primary',
      class: colorVariants.solid.primary,
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: colorVariants.solid.secondary,
    },
    {
      variant: 'solid',
      color: 'success',
      class: colorVariants.solid.success,
    },
    {
      variant: 'solid',
      color: 'warning',
      class: colorVariants.solid.warning,
    },
    {
      variant: 'solid',
      color: 'danger',
      class: colorVariants.solid.danger,
    },
    // shadow / color
    {
      variant: 'shadow',
      color: 'default',
      class: colorVariants.shadow.default,
    },
    {
      variant: 'shadow',
      color: 'primary',
      class: colorVariants.shadow.primary,
    },
    {
      variant: 'shadow',
      color: 'secondary',
      class: colorVariants.shadow.secondary,
    },
    {
      variant: 'shadow',
      color: 'success',
      class: colorVariants.shadow.success,
    },
    {
      variant: 'shadow',
      color: 'warning',
      class: colorVariants.shadow.warning,
    },
    {
      variant: 'shadow',
      color: 'danger',
      class: colorVariants.shadow.danger,
    },
    // bordered / color
    {
      variant: 'bordered',
      color: 'default',
      class: colorVariants.bordered.default,
    },
    {
      variant: 'bordered',
      color: 'primary',
      class: colorVariants.bordered.primary,
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: colorVariants.bordered.secondary,
    },
    {
      variant: 'bordered',
      color: 'success',
      class: colorVariants.bordered.success,
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: colorVariants.bordered.warning,
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: colorVariants.bordered.danger,
    },
    // flat / color
    {
      variant: 'flat',
      color: 'default',
      class: colorVariants.flat.default,
    },
    {
      variant: 'flat',
      color: 'primary',
      class: colorVariants.flat.primary,
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: colorVariants.flat.secondary,
    },
    {
      variant: 'flat',
      color: 'success',
      class: colorVariants.flat.success,
    },
    {
      variant: 'flat',
      color: 'warning',
      class: colorVariants.flat.warning,
    },
    {
      variant: 'flat',
      color: 'danger',
      class: colorVariants.flat.danger,
    },
    // faded / color
    {
      variant: 'faded',
      color: 'default',
      class: colorVariants.faded.default,
    },
    {
      variant: 'faded',
      color: 'primary',
      class: colorVariants.faded.primary,
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: colorVariants.faded.secondary,
    },
    {
      variant: 'faded',
      color: 'success',
      class: colorVariants.faded.success,
    },
    {
      variant: 'faded',
      color: 'warning',
      class: colorVariants.faded.warning,
    },
    {
      variant: 'faded',
      color: 'danger',
      class: colorVariants.faded.danger,
    },
    // light / color
    {
      variant: 'light',
      color: 'default',
      class: [colorVariants.light.default, 'hover:bg-default/40'],
    },
    {
      variant: 'light',
      color: 'primary',
      class: [colorVariants.light.primary, 'hover:bg-primary/20'],
    },
    {
      variant: 'light',
      color: 'secondary',
      class: [colorVariants.light.secondary, 'hover:bg-secondary/20'],
    },
    {
      variant: 'light',
      color: 'success',
      class: [colorVariants.light.success, 'hover:bg-success/20'],
    },
    {
      variant: 'light',
      color: 'warning',
      class: [colorVariants.light.warning, 'hover:bg-warning/20'],
    },
    {
      variant: 'light',
      color: 'danger',
      class: [colorVariants.light.danger, 'hover:bg-danger/20'],
    },
    // ghost / color
    {
      variant: 'ghost',
      color: 'default',
      class: colorVariants.ghost.default,
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: colorVariants.ghost.primary,
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: colorVariants.ghost.secondary,
    },
    {
      variant: 'ghost',
      color: 'success',
      class: colorVariants.ghost.success,
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: colorVariants.ghost.warning,
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: colorVariants.ghost.danger,
    },
    // isInGroup / size
    {
      isInGroup: true,
      size: 'sm',
      class: 'rounded-none first:rounded-l-small last:rounded-r-small',
    },
    {
      isInGroup: true,
      size: 'md',
      class: 'rounded-none first:rounded-l-medium last:rounded-r-medium',
    },
    {
      isInGroup: true,
      size: 'lg',
      class: 'rounded-none first:rounded-l-large last:rounded-r-large',
    },
    {
      isInGroup: true,
      class: 'rounded-none first:rounded-l-full last:rounded-r-full',
    },
    // isInGroup / bordered / ghost
    {
      isInGroup: true,
      variant: ['bordered', 'ghost'],
      class: '[&:not(:first-child)]:ml-[calc(theme(borderWidth.2)*-1)]',
    },
    {
      isIconOnly: true,
      size: 'sm',
      class: 'w-8 h-8',
    },
    {
      isIconOnly: true,
      size: 'md',
      class: 'w-10 h-10',
    },
    {
      isIconOnly: true,
      size: 'lg',
      class: 'w-12 h-12',
    },
  ],
});

/**
 * ButtonGroup component
 *
 * const styles = buttonGroup({...})
 *
 * @example
 * <div role="group" className={styles())}>
 *   // button elements
 * </div>
 */
const buttonGroup = cva({
  base: 'inline-flex items-center justify-center h-auto',
  variants: {
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;

export { button, buttonGroup };

import type { VariantProps } from 'tailwind-variants';

import { dataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

const menu = tv({
  slots: {
    base: ['w-full', 'flex', 'flex-col', 'gap-0.5', 'p-1', 'outline-hidden', 'overflow-auto'],
    popover: [
      'p-1',
      'min-w-[200px]',
      // top
      'data-[placement=top]:mb-0',
      // bottom
      'data-[placement=bottom]:mt-0',
      // left
      'data-[placement=left]:mr-0',
      // right
      'data-[placement=right]:ml-0',
    ],
  },
});

const menuSection = tv({
  slots: {
    base: ['group'],
    header: ['text-xs', 'text-foreground-500', 'p-2'],
  },
});

const menuItem = tv({
  slots: {
    base: [
      'flex',
      'group',
      'gap-2',
      'items-center',
      'justify-between',
      'relative',
      'px-2',
      'group-data-[group=true]:pl-5',
      'py-1.5',
      'w-full',
      'h-full',
      'box-border',
      'rounded-small',
      'subpixel-antialiased',
      'outline-hidden',
      'cursor-pointer',
      'tap-highlight-transparent',
      'data-[hovered=true]:transition-colors',
      'data-[focus-visible=true]:dark:ring-offset-background-content1',
      'data-[disabled=true]:opacity-disabled',
      'data-[disabled=true]:pointer-events-none',
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    wrapper: 'w-full flex flex-col items-start justify-center',
    title: 'flex-1 text-sm font-normal truncate',
    description: ['w-full', 'text-xs', 'text-foreground-500', 'group-hover:text-current'],
    selectedIcon: ['text-inherit', 'w-3', 'h-3', 'shrink-0'],
    shortcut: [
      'px-1',
      'py-0.5',
      'rounded-sm',
      'font-sans',
      'text-foreground-500',
      'text-xs',
      'border',
      'border-default-300',
      'group-hover:border-current',
    ],
  },
  variants: {
    variant: {
      solid: {
        base: '',
      },
      bordered: {
        base: ['border-2', 'border-transparent', 'bg-transparent'],
      },
      faded: {
        base: [
          'border',
          'border-transparent',
          'hover:border-default',
          'data-[hovered=true]:bg-default-100',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:border-default',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-default-100',
        ],
      },
      flat: {
        base: '',
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
  },
  defaultVariants: {
    variant: 'solid',
    color: 'default',
  },
  compoundVariants: [
    // solid / color
    {
      variant: 'solid',
      color: 'default',
      class: {
        base: [
          'data-[hovered=true]:bg-default',
          'data-[hovered=true]:text-default-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-default',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-default-foreground',
        ],
      },
    },
    {
      variant: 'solid',
      color: 'primary',
      class: {
        base: [
          'data-[hovered=true]:bg-primary',
          'data-[hovered=true]:text-primary-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-primary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-primary-foreground',
        ],
      },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        base: [
          'data-[hovered=true]:bg-secondary',
          'data-[hovered=true]:text-secondary-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-secondary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-secondary-foreground',
        ],
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        base: [
          'data-[hovered=true]:bg-success',
          'data-[hovered=true]:text-success-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-success',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-success-foreground',
        ],
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        base: [
          'data-[hovered=true]:bg-warning',
          'data-[hovered=true]:text-warning-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-warning',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-warning-foreground',
        ],
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        base: [
          'data-[hovered=true]:bg-danger',
          'data-[hovered=true]:text-danger-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-danger',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-danger-foreground',
        ],
      },
    },
    // bordered / color
    {
      variant: 'bordered',
      color: 'default',
      class: {
        base: [
          'data-[hovered=true]:border-default',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:border-default',
        ],
      },
    },
    {
      variant: 'bordered',
      color: 'primary',
      class: {
        base: [
          'data-[hovered=true]:border-primary',
          'data-[hovered=true]:text-primary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:border-primary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-primary',
        ],
      },
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: {
        base: [
          'data-[hovered=true]:border-secondary',
          'data-[hovered=true]:text-secondary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:border-secondary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-secondary',
        ],
      },
    },
    {
      variant: 'bordered',
      color: 'success',
      class: {
        base: [
          'data-[hovered=true]:border-success',
          'data-[hovered=true]:text-success',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:border-success',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-success',
        ],
      },
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: {
        base: [
          'data-[hovered=true]:border-warning',
          'data-[hovered=true]:text-warning',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:border-warning',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-warning',
        ],
      },
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: {
        base: [
          'data-[hovered=true]:border-danger',
          'data-[hovered=true]:text-danger',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:border-danger',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-danger',
        ],
      },
    },
    // flat / color
    {
      variant: 'flat',
      color: 'default',
      class: {
        base: [
          'data-[hovered=true]:bg-default/40',
          'data-[hovered=true]:text-default-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-default/40',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-default-foreground',
        ],
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      class: {
        base: [
          'data-[hovered=true]:bg-primary/20',
          'data-[hovered=true]:text-primary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-primary/20',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-primary',
        ],
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: {
        base: [
          'data-[hovered=true]:bg-secondary/20',
          'data-[hovered=true]:text-secondary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-secondary/20',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-secondary',
        ],
      },
    },
    {
      variant: 'flat',
      color: 'success',
      class: {
        base: [
          'data-[hovered=true]:bg-success/20',
          'data-[hovered=true]:text-success',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-success/20',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-success',
        ],
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      class: {
        base: [
          'data-[hovered=true]:bg-warning/20',
          'data-[hovered=true]:text-warning',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-warning/20',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-warning',
        ],
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      class: {
        base: [
          'data-[hovered=true]:bg-danger/20',
          'data-[hovered=true]:text-danger',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:bg-danger/20',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:focus:text-danger',
        ],
      },
    },
    // faded / color
    {
      variant: 'faded',
      color: 'default',
      class: {
        base: [
          'data-[hovered=true]:text-default-foreground',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:text-default-foreground',
        ],
      },
    },
    {
      variant: 'faded',
      color: 'primary',
      class: {
        base: [
          'data-[hovered=true]:text-primary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:text-primary',
        ],
      },
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: {
        base: [
          'data-[hovered=true]:text-secondary',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:text-secondary',
        ],
      },
    },
    {
      variant: 'faded',
      color: 'success',
      class: {
        base: [
          'data-[hovered=true]:text-success',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:text-success',
        ],
      },
    },
    {
      variant: 'faded',
      color: 'warning',
      class: {
        base: [
          'data-[hovered=true]:text-warning',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:text-warning',
        ],
      },
    },
    {
      variant: 'faded',
      color: 'danger',
      class: {
        base: [
          'data-[hovered=true]:text-danger',
          'data-[selection-mode]:[&:not([data-selection-mode="none"])]:text-danger',
        ],
      },
    },
  ],
});

export type MenuVariantProps = VariantProps<typeof menu>;
export type MenuSlots = keyof ReturnType<typeof menu>;
export type MenuItemVariantProps = VariantProps<typeof menuItem>;
export type MenuItemSlots = keyof ReturnType<typeof menuItem>;
export type MenuSectionSlots = keyof ReturnType<typeof menuSection>;

export { menu, menuItem, menuSection };

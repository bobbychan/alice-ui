import type { VariantProps } from 'tailwind-variants';

import { colorVariants, dataFocusVisibleClasses } from '../utils';
import { tv } from '../utils/tv';

/**
 * Tabs wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, tabList, tab, panel} = tabs({...})
 *
 * <div className={base())}>
 *  <div className={tabList())}>
 *    <div className={tab())} data-selected="boolean">Tab 1</div>
 *    <div className={tab())} data-selected="boolean" data-disabled="boolean">Tab 2</div>
 *    <div className={tab())} data-selected="boolean">Tab 3</div>
 *  </div>
 *  <div className={panel())}>Selected panel</div>
 * </div>
 * ```
 */
const tabs = tv({
  slots: {
    base: [
      'group/tabs',
      'data-[orientation=horizontal]:flex-col',
      'data-[orientation=vertical]:flex-row',
    ],
    tabList: [
      'inline-flex',
      'h-fit',
      'p-1',
      'gap-2',
      'items-center',
      'flex-nowrap',
      'overflow-x-auto',
      'scrollbar-hide',
    ],
    tab: [
      'group',
      'z-0',
      'w-full',
      'px-3',
      'py-1',
      'flex',
      'relative',
      'justify-center',
      'items-center',
      'whitespace-nowrap',
      'outline-none',
      'cursor-pointer',
      'transition-opacity',
      'tap-highlight-transparent',
      'data-[disabled=true]:cursor-not-allowed',
      'data-[disabled=true]:opacity-30',
      'data-[selected=true]:text-foreground',
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    tabContent: [
      'relative',
      'z-10',
      'text-inherit',
      'whitespace-nowrap',
      'transition-colors',
      'text-default-500',
      'group-data-[selected=true]:text-foreground',
    ],
    cursor: ['absolute', 'z-0', 'bg-white'],
    panel: [
      'py-3',
      'px-1',
      'outline-none',
      // focus ring
      ...dataFocusVisibleClasses,
    ],
  },
  variants: {
    variant: {
      solid: {
        tabList: 'bg-default-100',
        cursor: 'inset-0',
      },
      underlined: {
        tabList: ['bg-transparent', 'dark:bg-transparent', 'p-0'],
        cursor: ['h-[2px]', 'w-full', 'bottom-0'],
      },
      light: {
        tabList: ['bg-transparent', 'dark:bg-transparent'],
        cursor: 'inset-0',
      },
      bordered: {
        tabList: [
          'bg-transparent',
          'dark:bg-transparent',
          'border-2',
          'border-default-200',
          'shadow-sm',
        ],
        cursor: 'inset-0',
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
        tabList: 'rounded-medium',
        tab: 'h-7 text-xs rounded-small',
        cursor: 'rounded-small',
      },
      md: {
        tabList: 'rounded-medium',
        tab: 'h-8 text-sm rounded-small',
        cursor: 'rounded-small',
      },
      lg: {
        tabList: 'rounded-large',
        tab: 'h-9 text-md rounded-medium',
        cursor: 'rounded-medium',
      },
    },
    radius: {
      none: {
        tabList: 'rounded-none',
        tab: 'rounded-none',
        cursor: 'rounded-none',
      },
      sm: {
        tabList: 'rounded-medium',
        tab: 'rounded-small',
        cursor: 'rounded-small',
      },
      md: {
        tabList: 'rounded-medium',
        tab: 'rounded-small',
        cursor: 'rounded-small',
      },
      lg: {
        tabList: 'rounded-large',
        tab: 'rounded-medium',
        cursor: 'rounded-medium',
      },
      full: {
        tabList: 'rounded-full',
        tab: 'rounded-full',
        cursor: 'rounded-full',
      },
    },
    fullWidth: {
      true: {
        tabList: 'flex',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    variant: 'underlined',
    fullWidth: false,
  },
  compoundVariants: [
    /**
     * Variants & Sizes
     */
    // underline && size
    {
      variant: 'underlined',
      size: 'sm',
      class: {
        tab: 'h-9',
      },
    },
    {
      variant: 'underlined',
      size: 'md',
      class: {
        tab: 'h-10',
      },
    },
    {
      variant: 'underlined',
      size: 'lg',
      class: {
        tab: 'h-11',
      },
    },
    /**
     * Variants & Colors
     */
    // solid + bordered + light && color
    {
      variant: ['solid', 'bordered', 'light'],
      color: 'default',
      class: {
        cursor: ['bg-background', 'dark:bg-default', 'shadow-small'],
        tabContent: 'group-data-[selected=true]:text-default-foreground',
      },
    },
    {
      variant: ['solid', 'bordered', 'light'],
      color: 'primary',
      class: {
        cursor: colorVariants.solid.primary,
        tabContent: 'group-data-[selected=true]:text-primary-foreground',
      },
    },
    {
      variant: ['solid', 'bordered', 'light'],
      color: 'secondary',
      class: {
        cursor: colorVariants.solid.secondary,
        tabContent: 'group-data-[selected=true]:text-secondary-foreground',
      },
    },
    {
      variant: ['solid', 'bordered', 'light'],
      color: 'success',
      class: {
        cursor: colorVariants.solid.success,
        tabContent: 'group-data-[selected=true]:text-success-foreground',
      },
    },
    {
      variant: ['solid', 'bordered', 'light'],
      color: 'warning',
      class: {
        cursor: colorVariants.solid.warning,
        tabContent: 'group-data-[selected=true]:text-warning-foreground',
      },
    },
    {
      variant: ['solid', 'bordered', 'light'],
      color: 'danger',
      class: {
        cursor: colorVariants.solid.danger,
        tabContent: 'group-data-[selected=true]:text-danger-foreground',
      },
    },
    // underlined && color
    {
      variant: 'underlined',
      color: 'default',
      class: {
        cursor: 'bg-foreground',
        tabContent: [
          'group-data-[hovered=true]:text-foreground',
          'group-data-[selected=true]:text-foreground',
        ],
      },
    },
    {
      variant: 'underlined',
      color: 'primary',
      class: {
        cursor: 'bg-primary',
        tabContent: [
          'group-data-[hovered=true]:text-primary',
          'group-data-[selected=true]:text-primary',
        ],
      },
    },
    {
      variant: 'underlined',
      color: 'secondary',
      class: {
        cursor: 'bg-secondary',
        tabContent: [
          'group-data-[hovered=true]:text-secondary',
          'group-data-[selected=true]:text-secondary',
        ],
      },
    },
    {
      variant: 'underlined',
      color: 'success',
      class: {
        cursor: 'bg-success',
        tabContent: [
          'group-data-[hovered=true]:text-success',
          'group-data-[selected=true]:text-success',
        ],
      },
    },
    {
      variant: 'underlined',
      color: 'warning',
      class: {
        cursor: 'bg-warning',
        tabContent: [
          'group-data-[hovered=true]:text-warning',
          'group-data-[selected=true]:text-warning',
        ],
      },
    },
    {
      variant: 'underlined',
      color: 'danger',
      class: {
        cursor: 'bg-danger',
        tabContent: [
          'group-data-[hovered=true]:text-danger',
          'group-data-[selected=true]:text-danger',
        ],
      },
    },
  ],
  compoundSlots: [
    {
      variant: 'underlined',
      slots: ['tab', 'tabList', 'cursor'],
      class: ['rounded-none'],
    },
  ],
});

export type TabsVariantProps = VariantProps<typeof tabs>;
export type TabsSlots = keyof ReturnType<typeof tabs>;
export type TabsReturnType = ReturnType<typeof tabs>;

export { tabs };

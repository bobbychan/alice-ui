import { clsx } from '@alice-ui/shared-utils';
import { MenuSlots, MenuVariantProps, SlotsToClasses, menu } from '@alice-ui/theme';
import { createContext, useMemo } from 'react';
import type { Placement } from 'react-aria';
import type { MenuProps as AriaMenuProps } from 'react-aria-components';
import { Menu as AriaMenu } from 'react-aria-components';
import { Popover } from '../popover';

import { MenuItemProps } from './menu-item';

export interface MenuProps<T> extends AriaMenuProps<T>, MenuVariantProps {
  placement?: Placement;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Menu classNames={{
   *    base:"base-classes",
   *    popover: "popover-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<MenuSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: MenuItemProps['classNames'];
  /**
   * The menu items variant.
   */
  variant?: MenuItemProps['variant'];
  /**
   * The menu items color.
   */
  color?: MenuItemProps['color'];
}

interface InternalMenuContextValue {
  itemClasses?: MenuItemProps['classNames'];
  variant?: MenuItemProps['variant'];
  color?: MenuItemProps['color'];
}

export const InternalMenuContext = createContext<InternalMenuContextValue>(
  {} as InternalMenuContextValue,
);

export function Menu<T extends object>(props: MenuProps<T>) {
  const {
    children,
    className,
    classNames,
    placement = 'bottom',
    itemClasses,
    variant,
    color,
    ...otherProps
  } = props;

  const slots = useMemo(() => menu(), []);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <Popover
      isNonModal
      placement={placement}
      className={slots.popover({ class: classNames?.popover })}
    >
      <InternalMenuContext.Provider value={{ itemClasses, variant, color }}>
        <AriaMenu className={slots.base({ class: baseStyles })} {...otherProps}>
          {children}
        </AriaMenu>
      </InternalMenuContext.Provider>
    </Popover>
  );
}

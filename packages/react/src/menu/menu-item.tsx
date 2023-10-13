import { clsx } from '@alice-ui/shared-utils';
import { MenuItemSlots, MenuItemVariantProps, SlotsToClasses, menuItem } from '@alice-ui/theme';
import { ReactNode, useContext, useMemo } from 'react';
import type { ItemProps } from 'react-aria-components';
import { Item, Keyboard, Text } from 'react-aria-components';
import { InternalMenuContext } from './menu';
import { MenuSelectedIcon } from './menu-selected-icon';

export type MenuItemSelectedIconProps = {
  /**
   * The current icon, usually an checkmark icon.
   */
  icon?: ReactNode;
  /**
   * The current selected status.
   */
  isSelected?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

export interface MenuItemProps extends ItemProps, MenuItemVariantProps {
  /**
   * The menu item subtitle.
   */
  description?: ReactNode | string;
  /**
   * The menu item keyboard shortcut.
   */
  shortcut?: ReactNode | string;
  /**
   * The menu item start content.
   */
  startContent?: ReactNode;
  /**
   * The menu item end content.
   */
  endContent?: ReactNode;
  /**
   * The menu item `selected` icon, it's usually an checkmark icon.
   * If you pass a function, NextUI will expose the current selected icon and the selected status,
   * In case you want to use a custom indicator or modify the current one.
   *
   * Important: The selected icon will be rendered only if the menu selection mode is different than `none`.
   */
  selectedIcon?: ReactNode | ((props: MenuItemSelectedIconProps) => ReactNode) | null;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <MenuItem classNames={{
   *    base:"base-classes",
   *    title:"label-classes",
   *    wrapper:"wrapper-classes", // title and description wrapper
   *    description:"description-classes",
   *    selectedIcon:"selected-icon-classes",
   *    shortcut:"shortcut-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<MenuItemSlots>;
}

export function MenuItem(props: MenuItemProps) {
  const menuContext = useContext(InternalMenuContext);

  const {
    children,
    description,
    shortcut,
    startContent,
    endContent,
    selectedIcon,
    className,
    classNames = menuContext.itemClasses,
    color = menuContext.color,
    variant = menuContext.variant,
    ...otherProps
  } = props;

  const slots = useMemo(() => menuItem({ variant, color }), [color, variant]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <Item {...otherProps} className={slots.base({ class: baseStyles })}>
      {({ isSelected, isDisabled, selectionMode }) => {
        const selectedContent = () => {
          const defaultIcon = <MenuSelectedIcon isSelected={isSelected} />;

          if (typeof selectedIcon === 'function') {
            return selectedIcon({ icon: defaultIcon, isSelected, isDisabled });
          }

          if (selectedIcon) return selectedIcon;

          return defaultIcon;
        };

        return (
          <>
            {startContent}
            {description ? (
              <div className={slots.wrapper({ class: classNames?.wrapper })}>
                <Text slot="label" className={slots.title({ class: classNames?.title })}>
                  <>{children}</>
                </Text>
                <Text
                  slot="description"
                  className={slots.description({ class: classNames?.description })}
                >
                  {description}
                </Text>
              </div>
            ) : (
              <Text slot="label" className={slots.title({ class: classNames?.title })}>
                <>{children}</>
              </Text>
            )}
            {shortcut && (
              <Keyboard className={slots.shortcut({ class: classNames?.shortcut })}>
                {shortcut}
              </Keyboard>
            )}
            {selectionMode !== 'none' && (
              <span
                aria-hidden="true"
                className={slots.selectedIcon({ class: classNames?.selectedIcon })}
              >
                {selectedContent()}
              </span>
            )}
            {endContent}
          </>
        );
      }}
    </Item>
  );
}

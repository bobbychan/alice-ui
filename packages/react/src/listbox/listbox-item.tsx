'use client';

import { clsx } from '@alice-ui/shared-utils';
import { MenuItemSlots, MenuItemVariantProps, SlotsToClasses, menuItem } from '@alice-ui/theme';
import { ReactNode, useContext, useMemo } from 'react';
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components';
import { ListBoxItem as AriaListBoxItem, Text } from 'react-aria-components';
import { InternalListBoxContext } from './listbox';
import { ListBoxSelectedIcon } from './listbox-selected-icon';

export type ListBoxItemSelectedIconProps = {
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

export interface ListBoxItemProps extends AriaListBoxItemProps, MenuItemVariantProps {
  /**
   * The menu item subtitle.
   */
  description?: ReactNode | string;
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
  selectedIcon?: ReactNode | ((props: ListBoxItemSelectedIconProps) => ReactNode) | null;
  /**
   * Classes object to style the listbox item and its children.
   */
  classNames?: SlotsToClasses<MenuItemSlots>;
}

export function ListBoxItem(props: ListBoxItemProps) {
  const context = useContext(InternalListBoxContext);

  const {
    children,
    description,
    startContent,
    endContent,
    selectedIcon,
    className,
    classNames = context.itemClasses,
    color = context.color,
    variant = context.variant,
    ...otherProps
  } = props;

  const slots = useMemo(() => menuItem({ variant, color }), [color, variant]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AriaListBoxItem {...otherProps} className={slots.base({ class: baseStyles })}>
      {({ isSelected, isDisabled, selectionMode }) => {
        const selectedContent = () => {
          const defaultIcon = <ListBoxSelectedIcon isSelected={isSelected} />;

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
            {isSelected && selectionMode !== 'none' && (
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
    </AriaListBoxItem>
  );
}

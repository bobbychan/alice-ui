'use client';

import { clsx } from '@alice-ui/shared-utils';
import { MenuSlots, MenuVariantProps, SlotsToClasses, menu } from '@alice-ui/theme';
import { createContext, useMemo } from 'react';
import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components';
import { ListBox as AriaListBox } from 'react-aria-components';

import { ListBoxItemProps } from './listbox-item';

export interface ListBoxProps<T> extends AriaListBoxProps<T>, MenuVariantProps {
  /**
   * The listbox classNames.
   */
  classNames?: SlotsToClasses<MenuSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: ListBoxItemProps['classNames'];
  /**
   * The menu items variant.
   */
  variant?: ListBoxItemProps['variant'];
  /**
   * The menu items color.
   */
  color?: ListBoxItemProps['color'];
}

interface InternalListBoxContextValue {
  itemClasses?: ListBoxItemProps['classNames'];
  variant?: ListBoxItemProps['variant'];
  color?: ListBoxItemProps['color'];
}

export const InternalListBoxContext = createContext<InternalListBoxContextValue>(
  {} as InternalListBoxContextValue,
);

export function ListBox<T extends object>(props: ListBoxProps<T>) {
  const { children, className, classNames, itemClasses, variant, color, ...otherProps } = props;

  const slots = useMemo(() => menu(), []);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <InternalListBoxContext.Provider value={{ itemClasses, variant, color }}>
      <AriaListBox className={slots.base({ class: baseStyles })} {...otherProps}>
        {children}
      </AriaListBox>
    </InternalListBoxContext.Provider>
  );
}

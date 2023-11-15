'use client';

import { clsx } from '@alice-ui/shared-utils';
import { MenuSectionSlots, SlotsToClasses, menuSection } from '@alice-ui/theme';
import { ReactNode, useMemo } from 'react';
import type { SectionProps } from 'react-aria-components';
import { Header, Section } from 'react-aria-components';

export interface ListBoxSectionProps<T> extends SectionProps<T> {
  /**
   * The listbox section title.
   */
  title?: ReactNode | string;
  /**
   * The listbox section classNames.
   */
  classNames?: SlotsToClasses<MenuSectionSlots>;
}

export function ListBoxSection(props: ListBoxSectionProps<object>) {
  const { title, children, className, classNames, ...otherProps } = props;

  const slots = useMemo(() => menuSection(), []);
  const baseStyles = clsx(classNames?.base, className);

  return (
    <Section data-group="true" className={slots.base({ class: baseStyles })} {...otherProps}>
      <Header className={slots.header({ class: classNames?.header })}>{title}</Header>
      <>{children}</>
    </Section>
  );
}

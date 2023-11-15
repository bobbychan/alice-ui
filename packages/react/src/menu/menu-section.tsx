'use client';

import { clsx } from '@alice-ui/shared-utils';
import { MenuSectionSlots, SlotsToClasses, menuSection } from '@alice-ui/theme';
import { ReactNode, useMemo } from 'react';
import type { SectionProps } from 'react-aria-components';
import { Header, Section } from 'react-aria-components';

export interface MenuSectionProps<T> extends SectionProps<T> {
  /**
   * The menu section title.
   */
  title?: ReactNode | string;
  /**
   * The menu section classNames.
   */
  classNames?: SlotsToClasses<MenuSectionSlots>;
}

export function MenuSection(props: MenuSectionProps<object>) {
  const { title, children, className, classNames, ...otherProps } = props;

  const slots = useMemo(() => menuSection(), []);
  const baseStyles = clsx(classNames?.base, className);

  return (
    <Section className={slots.base({ class: baseStyles })} {...otherProps}>
      <Header className={slots.header({ class: classNames?.header })}>{title}</Header>
      <>{children}</>
    </Section>
  );
}

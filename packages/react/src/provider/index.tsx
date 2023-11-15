'use client';

import type { ModalProviderProps } from '@react-aria/overlays';

import { I18nProvider, I18nProviderProps, OverlayProvider, RouterProvider } from 'react-aria';

export interface AliceUIProviderProps extends Omit<ModalProviderProps, 'children'> {
  children: React.ReactNode;
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: I18nProviderProps['locale'];
  /**
   * Provides a client side router to all nested components such as
   * Link, Menu, Tabs, Table, etc.
   */
  navigate?: (path: string) => void;
}

export const AliceUIProvider: React.FC<AliceUIProviderProps> = ({
  children,
  locale = 'en-US',
  navigate,
  ...otherProps
}) => {
  let contents = children;

  if (navigate) {
    contents = <RouterProvider navigate={navigate}>{contents}</RouterProvider>;
  }

  return (
    <I18nProvider locale={locale}>
      <OverlayProvider {...otherProps}>{contents}</OverlayProvider>
    </I18nProvider>
  );
};

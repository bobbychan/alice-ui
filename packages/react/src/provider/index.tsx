import type { ModalProviderProps } from '@react-aria/overlays';
import type { Href } from '@react-types/shared';

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
  /**
   * Convert an `href` provided to a link component to a native `href`
   * For example, a router might accept hrefs relative to a base path,
   * or offer additional custom ways of specifying link destinations.
   * The original href specified on the link is passed to the navigate function of the RouterProvider,
   * and useHref is used to generate the full native href to put on the actual DOM element.
   */
  useHref?: (href: Href) => string;
}

export const AliceUIProvider: React.FC<AliceUIProviderProps> = ({
  children,
  locale = 'en-US',
  navigate,
  useHref,
  ...otherProps
}) => {
  let contents = children;

  if (navigate) {
    contents = (
      <RouterProvider navigate={navigate} useHref={useHref}>
        {contents}
      </RouterProvider>
    );
  }

  return (
    <I18nProvider locale={locale}>
      <OverlayProvider {...otherProps}>{contents}</OverlayProvider>
    </I18nProvider>
  );
};

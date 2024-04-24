import { useIsMounted } from '@alice-ui/hooks';
import { clsx } from '@alice-ui/shared-utils';
import type { SlotsToClasses, TabsReturnType, TabsSlots, TabsVariantProps } from '@alice-ui/theme';
import { filterVariantProps, tabs } from '@alice-ui/theme';
import {
  ReactElement,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
} from 'react';
import type {
  TabsProps as AriaTabsProps,
  TabListProps,
  TabPanelProps,
  TabProps,
} from 'react-aria-components';
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
} from 'react-aria-components';

export interface TabsProps extends AriaTabsProps, TabsVariantProps {
  indicator?: React.ReactNode;
  /**
   * Classes object to style the tabs and its children.
   */
  classNames?: SlotsToClasses<TabsSlots>;
}

interface InternalTabsContextValue {
  indicator?: React.ReactNode;
  slots: TabsReturnType;
  classNames?: SlotsToClasses<TabsSlots>;
}

export const InternalTabsContext = createContext<InternalTabsContextValue>(
  {} as InternalTabsContextValue,
);

function Tabs(props: TabsProps) {
  const { className, classNames, indicator, ...otherProps } = props;
  const variantProps = filterVariantProps(props, tabs.variantKeys);

  const slots = useMemo(() => tabs({ ...variantProps }), [variantProps]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <InternalTabsContext.Provider value={{ slots, classNames, indicator }}>
      <AriaTabs {...otherProps} className={slots.base({ class: baseStyles })} />
    </InternalTabsContext.Provider>
  );
}

function TabList<T extends object>(props: TabListProps<T>) {
  const { slots, classNames } = useContext(InternalTabsContext);

  return <AriaTabList {...props} className={slots.tabList({ class: classNames?.tabList })} />;
}

function Tab(props: TabProps) {
  const { slots, classNames, indicator } = useContext(InternalTabsContext);
  const { children } = props;

  const [, isMounted] = useIsMounted({
    rerender: true,
  });

  const getIndicatoContent = () => {
    if (indicator === null) {
      return null;
    }
    if (indicator) {
      if (!isValidElement(indicator)) return null;
      return cloneElement(indicator as ReactElement, {
        className: slots.cursor({ class: classNames?.cursor }),
      });
    }
    return <span className={slots.cursor({ class: classNames?.cursor })} />;
  };

  return (
    <AriaTab
      {...props}
      className={slots.tab({ class: classNames?.tab })}
      style={(styleProps) =>
        styleProps.isHovered && !styleProps.isSelected ? { opacity: 0.5 } : {}
      }
    >
      {(renderProps) => (
        <>
          {renderProps.isSelected && isMounted ? getIndicatoContent() : null}
          <div className={slots.tabContent({ class: classNames?.tabContent })}>
            {typeof children === 'function' ? children(renderProps) : children}
          </div>
        </>
      )}
    </AriaTab>
  );
}

function TabPanel(props: TabPanelProps) {
  const { slots, classNames } = useContext(InternalTabsContext);

  return <AriaTabPanel {...props} className={slots.panel({ class: classNames?.panel })} />;
}

export { Tab, TabList, TabPanel, Tabs };

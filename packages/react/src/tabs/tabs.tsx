import { clsx } from '@alice-ui/shared-utils';
import type { SlotsToClasses, TabsReturnType, TabsSlots, TabsVariantProps } from '@alice-ui/theme';
import { filterVariantProps, tabs } from '@alice-ui/theme';
import { HTMLMotionProps, LayoutGroup, motion } from 'framer-motion';
import { createContext, useContext, useId, useMemo } from 'react';
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
  /**
   * The props to modify the cursor motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<'span'>;
  /**
   * Whether the cursor should be hidden.
   * @default false
   */
  disableCursorAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tabs classNames={{
   *    base:"base-classes", // main wrapper (tabs + panels)
   *    tabList: "tab-list-classes", // tabs wrapper
   *    tab: "tab-classes", // tab item
   *    panel: "panel-classes", // tab panel
   * }} />
   * ``
   */
  classNames?: SlotsToClasses<TabsSlots>;
}

interface InternalTabsContextValue {
  slots: TabsReturnType;
  classNames?: SlotsToClasses<TabsSlots>;
  motionProps?: HTMLMotionProps<'span'>;
  disableCursorAnimation?: boolean;
}

export const InternalTabsContext = createContext<InternalTabsContextValue>(
  {} as InternalTabsContextValue,
);

function Tabs(props: TabsProps) {
  const { className, classNames, motionProps, disableCursorAnimation, ...otherProps } = props;
  const variantProps = filterVariantProps(props, tabs.variantKeys);

  const slots = useMemo(() => tabs({ ...variantProps }), [variantProps]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <InternalTabsContext.Provider
      value={{ slots, classNames, motionProps, disableCursorAnimation }}
    >
      <AriaTabs {...otherProps} className={slots.base({ class: baseStyles })} />
    </InternalTabsContext.Provider>
  );
}

function TabList<T extends object>(props: TabListProps<T>) {
  const { slots, classNames } = useContext(InternalTabsContext);

  const layoutId = useId();

  return (
    <LayoutGroup id={layoutId}>
      <AriaTabList {...props} className={slots.tabList({ class: classNames?.tabList })} />
    </LayoutGroup>
  );
}

function Tab(props: TabProps) {
  const { slots, classNames, disableCursorAnimation, motionProps } =
    useContext(InternalTabsContext);
  const { children } = props;

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
          {renderProps.isSelected && !disableCursorAnimation ? (
            <motion.span
              className={slots.cursor({ class: classNames?.cursor })}
              layoutDependency={false}
              initial={false}
              layoutId="cursor"
              transition={{
                type: 'spring',
                bounce: 0.18,
                duration: 0.6,
              }}
              {...motionProps}
            />
          ) : null}
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

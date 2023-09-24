import { clsx } from '@alice-ui/shared-utils';
import type { PopoverSlots, PopoverVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { popover } from '@alice-ui/theme';
import { ReactNode, useMemo } from 'react';
import type {
  TooltipProps as AriaTooltipProps,
  TooltipTriggerComponentProps,
} from 'react-aria-components';
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow,
} from 'react-aria-components';

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'>, PopoverVariantProps {
  children?: ReactNode;
  /**
   * Whether the element should render an arrow.
   * @default false
   */
  showArrow?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tooltip classNames={{
   *    base:"base-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PopoverSlots>;
}

function Tooltip(props: TooltipProps) {
  const {
    children,
    showArrow = false,
    offset = 8,
    placement = 'top',
    color,
    size,
    radius,
    shadow,
    classNames,
    className,
    ...otherProps
  } = props;

  const slots = useMemo(
    () => popover({ color, size, radius, shadow }),
    [color, size, radius, shadow],
  );

  const baseStyles = clsx(classNames?.base, className);

  const arrowContent = useMemo(() => {
    if (!showArrow) return null;

    return (
      <OverlayArrow className={slots.arrow({ class: classNames?.arrow })}>
        <svg width={12} height={12} viewBox="0 0 12 12">
          <path d="M0 0 L6 6 L12 0" />
        </svg>
      </OverlayArrow>
    );
  }, [classNames?.arrow, showArrow, slots]);

  return (
    <AriaTooltip
      offset={offset}
      placement={placement}
      {...otherProps}
      className={slots.base({ class: baseStyles })}
    >
      {arrowContent}
      {children}
    </AriaTooltip>
  );
}

function TooltipTrigger(props: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger delay={200} closeDelay={400} {...props} />;
}

export { Tooltip, TooltipTrigger };

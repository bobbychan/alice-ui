import { clsx } from '@alice-ui/shared-utils';
import type { PopoverSlots, PopoverVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { popover } from '@alice-ui/theme';
import { ReactNode, useMemo } from 'react';
import type { PopoverProps as AriaPopoverProps } from 'react-aria-components';
import { Popover as AriaPopover, Dialog, OverlayArrow } from 'react-aria-components';

export interface PopoverProps extends Omit<AriaPopoverProps, 'children'>, PopoverVariantProps {
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
   * <Popover classNames={{
   *    base:"base-classes",
   *    backdrop: "backdrop-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PopoverSlots>;
}

function Popover(props: PopoverProps) {
  const {
    children,
    showArrow = false,
    isNonModal = false,
    placement = 'bottom',
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
    <AriaPopover
      isNonModal={isNonModal}
      placement={placement}
      {...otherProps}
      className={slots.base({ class: baseStyles })}
    >
      {arrowContent}
      <Dialog className="outline-none">{children}</Dialog>
    </AriaPopover>
  );
}

/**
 * A popover is an overlay element positioned relative to a trigger.
 */
export { Popover };

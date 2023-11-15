'use client';

import { clsx } from '@alice-ui/shared-utils';
import type { PopoverSlots, PopoverVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { popover } from '@alice-ui/theme';
import { PressResponder } from '@react-aria/interactions';
import { ReactNode, useMemo, useRef } from 'react';
import { useOverlayTrigger } from 'react-aria';
import {
  Dialog,
  DialogContext,
  OverlayArrow,
  OverlayTriggerStateContext,
  PopoverContext,
  Provider,
} from 'react-aria-components';
import { OverlayTriggerProps, useOverlayTriggerState } from 'react-stately';
import type { BasePopoverProps } from './base-popover';
import { BasePopover } from './base-popover';

export interface PopoverTriggerProps extends OverlayTriggerProps {
  children: ReactNode;
}

export interface PopoverProps extends Omit<BasePopoverProps, 'children'>, PopoverVariantProps {
  children?: ReactNode;
  /**
   * Whether the element should render an arrow.
   * @default false
   */
  showArrow?: boolean;
  /**
   * Classes object to style the popover and its children.
   */
  classNames?: SlotsToClasses<PopoverSlots>;
}

/**
 * A PopoverTrigger opens a popover when a trigger element is pressed.
 */
export function PopoverTrigger(props: PopoverTriggerProps) {
  let state = useOverlayTriggerState(props);

  let buttonRef = useRef<HTMLButtonElement>(null);
  let { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, buttonRef);

  return (
    <Provider
      values={[
        [OverlayTriggerStateContext, state],
        [DialogContext, overlayProps],
        [PopoverContext, { triggerRef: buttonRef }],
      ]}
    >
      <PressResponder {...triggerProps} ref={buttonRef} isPressed={state.isOpen}>
        {props.children}
      </PressResponder>
    </Provider>
  );
}

function Popover(props: PopoverProps) {
  const {
    children,
    showArrow = false,
    isNonModal = true,
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
    <BasePopover
      isNonModal={isNonModal}
      placement={placement}
      {...otherProps}
      className={slots.base({ class: baseStyles })}
    >
      {arrowContent}
      <Dialog className={slots.content({ class: classNames?.content })}>{children}</Dialog>
    </BasePopover>
  );
}

/**
 * A popover is an overlay element positioned relative to a trigger.
 */
export { Popover };

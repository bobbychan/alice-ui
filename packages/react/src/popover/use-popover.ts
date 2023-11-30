'use client';
/**
 * This code comes from @react-aria/overlays
 */

import {
  AriaOverlayProps,
  AriaPositionProps,
  ariaHideOutside,
  useOverlay,
  useOverlayPosition,
  usePreventScroll,
} from '@react-aria/overlays';
import { mergeProps, useLayoutEffect } from '@react-aria/utils';
import { DOMAttributes } from '@react-types/shared';
import { RefObject } from 'react';
import { PlacementAxis } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

export interface AriaPopoverProps
  extends AriaOverlayProps,
    Omit<AriaPositionProps, 'isOpen' | 'onClose' | 'targetRef' | 'overlayRef'> {
  /**
   * The ref for the element which the popover positions itself with respect to.
   */
  triggerRef: RefObject<Element>;
  /**
   * The ref for the popover element.
   */
  popoverRef: RefObject<Element>;
  /**
   * Whether the popover is non-modal, i.e. elements outside the popover may be
   * interacted with by assistive technologies.
   *
   * Most popovers should not use this option as it may negatively impact the screen
   * reader experience. Only use with components such as combobox, which are designed
   * to handle this situation carefully.
   */
  isNonModal?: boolean;
  /**
   * Whether pressing the escape key to close the popover should be disabled.
   *
   * Most popovers should not use this option. When set to true, an alternative
   * way to close the popover with a keyboard must be provided.
   *
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;
}

export interface PopoverAria {
  /** Props for the popover element. */
  popoverProps: DOMAttributes;
  /** Props for the popover tip arrow if any. */
  arrowProps: DOMAttributes;
  /** Props to apply to the underlay element, if any. */
  underlayProps: DOMAttributes;
  /** Placement of the popover with respect to the trigger. */
  placement: PlacementAxis;
}

/**
 * Provides the behavior and accessibility implementation for a popover component.
 * A popover is an overlay element positioned relative to a trigger.
 */
export function usePopover(props: AriaPopoverProps, state: OverlayTriggerState): PopoverAria {
  const {
    triggerRef,
    popoverRef,
    isNonModal,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    ...otherProps
  } = props;

  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur: true,
      // isDismissable: !isNonModal,
      isDismissable: true,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside: shouldCloseOnInteractOutside
        ? shouldCloseOnInteractOutside
        : (element) => {
            // Don't close if the click is within the trigger or the popover itself
            let trigger = triggerRef?.current;

            return !trigger || !trigger.contains(element);
          },
    },
    popoverRef,
  );

  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
  } = useOverlayPosition({
    ...otherProps,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    onClose: () => {},
  });

  usePreventScroll({
    isDisabled: isNonModal || !state.isOpen,
  });

  useLayoutEffect(() => {
    if (state.isOpen && !isNonModal && popoverRef.current) {
      return ariaHideOutside([popoverRef.current]);
    }
  }, [isNonModal, state.isOpen, popoverRef]);

  return {
    popoverProps: mergeProps(overlayProps, positionProps),
    arrowProps,
    underlayProps,
    placement,
  };
}

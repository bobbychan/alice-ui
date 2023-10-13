/**
 * This code comes from react-aria-components/Popover
 */

import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { ForwardedRef, RefObject, forwardRef, useContext } from 'react';
import { AriaPopoverProps, DismissButton, Overlay, PlacementAxis, PositionProps } from 'react-aria';
import {
  OverlayTriggerStateContext,
  PopoverContext,
  SlotProps,
  useContextProps,
} from 'react-aria-components';
import { OverlayTriggerProps, OverlayTriggerState, useOverlayTriggerState } from 'react-stately';
import {
  HiddenContext,
  RenderProps,
  forwardRefType,
  useEnterAnimation,
  useExitAnimation,
  useRenderProps,
} from '../_utils/utils';
import { OverlayArrowContext } from '../overlay-arrow';
import { usePopover } from './use-popover';

export interface BasePopoverProps
  extends Omit<PositionProps, 'isOpen'>,
    Omit<AriaPopoverProps, 'popoverRef' | 'triggerRef'>,
    OverlayTriggerProps,
    RenderProps<BasePopoverRenderProps>,
    SlotProps {
  /**
   * The ref for the element which the popover positions itself with respect to.
   *
   * When used within a trigger component such as DialogTrigger, MenuTrigger, Select, etc.,
   * this is set automatically. It is only required when used standalone.
   */
  triggerRef?: RefObject<Element>;
}

export interface BasePopoverRenderProps {
  /**
   * The placement of the popover relative to the trigger.
   * @selector [data-placement="left | right | top | bottom"]
   */
  placement: PlacementAxis;
  /**
   * Whether the popover is currently entering. Use this to apply animations.
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the popover is currently exiting. Use this to apply animations.
   * @selector [data-exiting]
   */
  isExiting: boolean;
}

function BasePopover(props: BasePopoverProps, ref: ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, PopoverContext);
  let contextState = useContext(OverlayTriggerStateContext);
  let localState = useOverlayTriggerState(props);
  let state =
    props.isOpen != null || props.defaultOpen != null || !contextState ? localState : contextState;
  let isExiting = useExitAnimation(ref, state.isOpen);
  let isHidden = useContext(HiddenContext);

  // If we are in a hidden tree, we still need to preserve our children.
  if (isHidden) {
    let children = props.children;
    if (typeof children === 'function') {
      children = children({
        placement: 'bottom',
        isEntering: false,
        isExiting: false,
      });
    }

    return <>{children}</>;
  }

  if (state && !state.isOpen && !isExiting) {
    return null;
  }

  return (
    <PopoverInner
      {...props}
      triggerRef={props.triggerRef!}
      state={state}
      popoverRef={ref}
      isExiting={isExiting}
    />
  );
}

/**
 * A popover is an overlay element positioned relative to a trigger.
 */
const _Popover = /*#__PURE__*/ (forwardRef as forwardRefType)(BasePopover);
export { _Popover as BasePopover };

interface PopoverInnerProps
  extends AriaPopoverProps,
    RenderProps<BasePopoverRenderProps>,
    SlotProps {
  state: OverlayTriggerState;
  isExiting: boolean;
}

function PopoverInner({ state, isExiting, ...props }: PopoverInnerProps) {
  let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset: props.offset ?? 8,
    },
    state,
  );

  let ref = props.popoverRef as RefObject<HTMLDivElement>;
  let isEntering = useEnterAnimation(ref, !!placement);
  let renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-Popover',
    values: {
      placement,
      isEntering,
      isExiting,
    },
  });

  let style = { ...renderProps.style, ...popoverProps.style };

  return (
    <Overlay isExiting={isExiting}>
      {!props.isNonModal && <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />}
      <div
        {...mergeProps(filterDOMProps(props as any), popoverProps)}
        {...renderProps}
        ref={ref}
        slot={props.slot || undefined}
        style={style}
        data-placement={placement}
        data-entering={isEntering || undefined}
        data-exiting={isExiting || undefined}
      >
        {!props.isNonModal && <DismissButton onDismiss={state.close} />}
        <OverlayArrowContext.Provider value={{ ...arrowProps, placement }}>
          {renderProps.children}
        </OverlayArrowContext.Provider>
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { ForwardedRef, RefObject, createContext, forwardRef, useContext } from 'react';
import {
  AriaPopoverProps,
  DismissButton,
  Overlay,
  PlacementAxis,
  PositionProps,
  usePopover,
} from 'react-aria';
import { OverlayTriggerProps, OverlayTriggerState, useOverlayTriggerState } from 'react-stately';
import {
  ContextValue,
  HiddenContext,
  RenderProps,
  SlotProps,
  forwardRefType,
  useContextProps,
  useEnterAnimation,
  useExitAnimation,
  useRenderProps,
} from '../_util/utils';
import { OverlayArrowContext } from '../overlay-arrow';

export interface PopoverProps
  extends Omit<PositionProps, 'isOpen'>,
    Omit<AriaPopoverProps, 'popoverRef' | 'triggerRef'>,
    OverlayTriggerProps,
    RenderProps<PopoverRenderProps>,
    SlotProps {
  /**
   * The ref for the element which the popover positions itself with respect to.
   *
   * When used within a trigger component such as DialogTrigger, MenuTrigger, Select, etc.,
   * this is set automatically. It is only required when used standalone.
   */
  triggerRef?: RefObject<Element>;
}

export interface PopoverRenderProps {
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

interface PopoverContextValue extends PopoverProps {
  state?: OverlayTriggerState;
  triggerRef?: RefObject<Element>;
}

export const PopoverContext = createContext<ContextValue<PopoverContextValue, HTMLElement>>(null);

function Popover(props: PopoverProps, ref: ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, PopoverContext);
  const ctx = props as PopoverContextValue;
  const localState = useOverlayTriggerState(props);
  const state =
    props.isOpen != null || props.defaultOpen != null || !ctx?.state ? localState : ctx.state;
  const isExiting = useExitAnimation(ref, state.isOpen);
  const isHidden = useContext(HiddenContext);

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
      triggerRef={ctx.triggerRef!}
      state={state}
      popoverRef={ref}
      isExiting={isExiting}
    />
  );
}

/**
 * A popover is an overlay element positioned relative to a trigger.
 */
const _Popover = (forwardRef as forwardRefType)(Popover);
export { _Popover as Popover };

interface PopoverInnerProps extends AriaPopoverProps, RenderProps<PopoverRenderProps>, SlotProps {
  state: OverlayTriggerState;
  isExiting: boolean;
}

function PopoverInner({ state, isExiting, ...props }: PopoverInnerProps) {
  const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset: props.offset ?? 8,
    },
    state,
  );

  const ref = props.popoverRef as RefObject<HTMLDivElement>;
  const isEntering = useEnterAnimation(ref, !!placement);
  const renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-Popover',
    values: {
      placement,
      isEntering,
      isExiting,
    },
  });

  const style = { ...renderProps.style, ...popoverProps.style };

  return (
    <Overlay isExiting={isExiting}>
      {!props.isNonModal && <div {...underlayProps} style={{ position: 'fixed', inset: 0 }} />}
      <div
        {...mergeProps(filterDOMProps(props as any), popoverProps)}
        {...renderProps}
        ref={ref}
        slot={props.slot}
        style={style}
        data-placement={placement}
        data-entering={isEntering || undefined}
        data-exiting={isExiting || undefined}
      >
        {!props.isNonModal && <DismissButton onDismiss={state.close} />}
        <OverlayArrowContext.Provider value={{ arrowProps, placement }}>
          {renderProps.children}
        </OverlayArrowContext.Provider>
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

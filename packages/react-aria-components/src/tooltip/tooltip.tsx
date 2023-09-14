import { mergeRefs, useObjectRef } from '@react-aria/utils';
import { AriaLabelingProps, DOMAttributes, FocusableElement } from '@react-types/shared';
import { ForwardedRef, RefObject, createContext, forwardRef, useContext, useRef } from 'react';
import {
  OverlayContainer,
  PlacementAxis,
  PositionProps,
  mergeProps,
  useOverlayPosition,
  useTooltip,
} from 'react-aria';
import { TooltipTriggerState } from 'react-stately';
import {
  RenderProps,
  forwardRefType,
  useEnterAnimation,
  useExitAnimation,
  useRenderProps,
} from '../_utils/utils';
import { OverlayArrowContext } from '../overlay-arrow';

export interface TooltipProps
  extends PositionProps,
    AriaLabelingProps,
    RenderProps<TooltipRenderProps> {}

export interface TooltipRenderProps {
  /**
   * The placement of the tooltip relative to the trigger.
   * @selector [data-placement="left | right | top | bottom"]
   */
  placement: PlacementAxis;
  /**
   * Whether the tooltip is currently entering. Use this to apply animations.
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the tooltip is currently exiting. Use this to apply animations.
   * @selector [data-exiting]
   */
  isExiting: boolean;
  /**
   * State of the tooltip.
   */
  state: TooltipTriggerState;
}

interface TooltipContextValue {
  state: TooltipTriggerState;
  triggerRef: RefObject<FocusableElement>;
  tooltipProps: DOMAttributes;
}

export const InternalTooltipContext = createContext<TooltipContextValue | null>(null);

function Tooltip(props: TooltipProps, ref: ForwardedRef<HTMLDivElement>) {
  let { state } = useContext(InternalTooltipContext)!;
  let objectRef = useObjectRef(ref);
  let isExiting = useExitAnimation(objectRef, state.isOpen);
  if (!state.isOpen && !isExiting) {
    return null;
  }

  return (
    <OverlayContainer>
      <TooltipInner {...props} tooltipRef={objectRef} isExiting={isExiting} />
    </OverlayContainer>
  );
}

/**
 * A tooltip displays a description of an element on hover or focus.
 */
const _Tooltip = /*#__PURE__*/ (forwardRef as forwardRefType)(Tooltip);
export { _Tooltip as Tooltip };

function TooltipInner(
  props: TooltipProps & { isExiting: boolean; tooltipRef: ForwardedRef<HTMLDivElement> },
) {
  let {
    state,
    triggerRef,
    tooltipProps: triggerTooltipProps,
  } = useContext(InternalTooltipContext)!;

  let overlayRef = useRef<HTMLDivElement>(null);
  let { overlayProps, arrowProps, placement } = useOverlayPosition({
    placement: props.placement || 'top',
    targetRef: triggerRef,
    overlayRef,
    offset: props.offset,
    crossOffset: props.crossOffset,
    isOpen: state.isOpen,
  });

  let isEntering = useEnterAnimation(overlayRef, !!placement);
  let renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-Tooltip',
    values: {
      placement,
      isEntering,
      isExiting: props.isExiting,
      state,
    },
  });

  props = mergeProps(props, overlayProps);
  let { tooltipProps } = useTooltip(props, state);

  return (
    <div
      {...mergeProps(triggerTooltipProps, tooltipProps)}
      ref={mergeRefs(overlayRef, props.tooltipRef)}
      {...renderProps}
      style={{ ...renderProps.style, ...overlayProps.style }}
      data-placement={placement}
      data-entering={isEntering || undefined}
      data-exiting={props.isExiting || undefined}
    >
      <OverlayArrowContext.Provider value={{ arrowProps, placement }}>
        {renderProps.children}
      </OverlayArrowContext.Provider>
    </div>
  );
}

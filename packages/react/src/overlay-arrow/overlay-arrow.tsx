/**
 * This code comes from react-aria-components
 */

import { createContext, CSSProperties, ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import { PlacementAxis } from 'react-aria';
import {
  ContextValue,
  forwardRefType,
  RenderProps,
  useContextProps,
  useRenderProps,
} from '../_utils/utils';

interface OverlayArrowContextValue extends OverlayArrowProps {
  placement: PlacementAxis;
}

export const OverlayArrowContext = createContext<
  ContextValue<OverlayArrowContextValue, HTMLDivElement>
>({
  placement: 'bottom',
});

export interface OverlayArrowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'children'>,
    RenderProps<OverlayArrowRenderProps> {}

export interface OverlayArrowRenderProps {
  /**
   * The placement of the overlay relative to the trigger.
   * @selector [data-placement="left | right | top | bottom"]
   */
  placement: PlacementAxis;
}

function OverlayArrow(props: OverlayArrowProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, OverlayArrowContext);
  let placement = (props as OverlayArrowContextValue).placement;
  let style: CSSProperties = {
    position: 'absolute',
    [placement]: '100%',
    transform:
      placement === 'top' || placement === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
  };

  let renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-OverlayArrow',
    values: {
      placement,
    },
  });

  return (
    <div
      {...props}
      {...renderProps}
      style={{
        ...renderProps.style,
        ...style,
      }}
      ref={ref}
      data-placement={placement}
    />
  );
}

/**
 * An OverlayArrow renders a custom arrow element relative to an overlay element
 * such as a popover or tooltip such that it aligns with a trigger element.
 */
const _OverlayArrow = /*#__PURE__*/ (forwardRef as forwardRefType)(OverlayArrow);
export { _OverlayArrow as OverlayArrow };

import { ForwardedRef, createContext, forwardRef } from 'react';
import {
  AriaToggleButtonProps,
  mergeProps,
  useFocusRing,
  useHover,
  useToggleButton,
} from 'react-aria';
import { ToggleState, useToggleState } from 'react-stately';
import {
  ContextValue,
  RenderProps,
  SlotProps,
  forwardRefType,
  useContextProps,
  useRenderProps,
} from '../_utils/utils';
import { ButtonRenderProps } from '../button';

export interface ToggleButtonRenderProps extends ButtonRenderProps {
  /**
   * Whether the button is currently selected.
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * State of the toggle button.
   */
  state: ToggleState;
}

export interface ToggleButtonProps
  extends Omit<AriaToggleButtonProps, 'children' | 'elementType'>,
    SlotProps,
    RenderProps<ToggleButtonRenderProps> {}

export const ToggleButtonContext = createContext<
  ContextValue<ToggleButtonProps, HTMLButtonElement>
>({});

function ToggleButton(props: ToggleButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  [props, ref] = useContextProps(props, ref, ToggleButtonContext);
  let state = useToggleState(props);
  let { buttonProps, isPressed } = useToggleButton(props, state, ref);
  let { focusProps, isFocused, isFocusVisible } = useFocusRing(props);
  let { hoverProps, isHovered } = useHover(props);
  let renderProps = useRenderProps({
    ...props,
    values: {
      isHovered,
      isPressed,
      isFocused,
      isSelected: state.isSelected,
      isFocusVisible,
      isDisabled: props.isDisabled || false,
      state,
    },
    defaultClassName: 'react-aria-ToggleButton',
  });

  return (
    <button
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      {...renderProps}
      ref={ref}
      slot={props.slot}
      data-focused={isFocused || undefined}
      data-disabled={props.isDisabled || undefined}
      data-pressed={isPressed || undefined}
      data-selected={state.isSelected || undefined}
      data-hovered={isHovered || undefined}
      data-focus-visible={isFocusVisible || undefined}
    />
  );
}

/**
 * A toggle button allows a user to toggle a selection on or off, for example switching between two states or modes.
 */
const _ToggleButton = /*#__PURE__*/ (forwardRef as forwardRefType)(ToggleButton);
export { _ToggleButton as ToggleButton };

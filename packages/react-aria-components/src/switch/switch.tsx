import { filterDOMProps } from '@react-aria/utils';
import { createContext, ForwardedRef, forwardRef, useState } from 'react';
import {
  AriaSwitchProps,
  mergeProps,
  useFocusRing,
  useHover,
  usePress,
  useSwitch,
  VisuallyHidden,
} from 'react-aria';
import { ToggleState, useToggleState } from 'react-stately';
import {
  ContextValue,
  forwardRefType,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
} from '../_utils/utils';

export interface SwitchProps
  extends Omit<AriaSwitchProps, 'children'>,
    RenderProps<SwitchRenderProps>,
    SlotProps {}

export interface SwitchRenderProps {
  /**
   * Whether the switch is selected.
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the switch is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the switch is currently in a pressed state.
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the switch is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the switch is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the switch is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the switch is read only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * State of the switch.
   */
  state: ToggleState;
}

export const SwitchContext = createContext<ContextValue<SwitchProps, HTMLInputElement>>(null);

function Switch(props: SwitchProps, ref: ForwardedRef<HTMLInputElement>) {
  [props, ref] = useContextProps(props, ref, SwitchContext);
  const state = useToggleState(props);
  const {
    inputProps,
    isSelected,
    isDisabled,
    isReadOnly,
    isPressed: isPressedKeyboard,
  } = useSwitch(
    {
      ...props,
      // ReactNode type doesn't allow function children.
      children: typeof props.children === 'function' ? true : props.children,
    },
    state,
    ref,
  );
  const { isFocused, isFocusVisible, focusProps } = useFocusRing();
  const isInteractionDisabled = props.isDisabled || props.isReadOnly;

  // Handle press state for full label. Keyboard press state is returned by useSwitch
  // since it is handled on the <input> element itself.
  const [isPressed, setPressed] = useState(false);
  const { pressProps } = usePress({
    isDisabled: isInteractionDisabled,
    onPressStart(e) {
      if (e.pointerType !== 'keyboard') {
        setPressed(true);
      }
    },
    onPressEnd(e) {
      if (e.pointerType !== 'keyboard') {
        setPressed(false);
      }
    },
  });

  const { hoverProps, isHovered } = useHover({
    isDisabled: isInteractionDisabled,
  });

  const pressed = isInteractionDisabled ? false : isPressed || isPressedKeyboard;

  const renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-Switch',
    values: {
      isSelected,
      isPressed: pressed,
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled,
      isReadOnly,
      state,
    },
  });

  let DOMProps = filterDOMProps(props);
  delete DOMProps.id;

  return (
    <label
      {...mergeProps(DOMProps, pressProps, hoverProps, renderProps)}
      slot={props.slot}
      data-selected={isSelected || undefined}
      data-pressed={pressed || undefined}
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
      data-disabled={isDisabled || undefined}
      data-readonly={isReadOnly || undefined}
    >
      <VisuallyHidden elementType="span">
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {renderProps.children}
    </label>
  );
}

/**
 * A switch allows a user to turn a setting on or off.
 */
const _Switch = (forwardRef as forwardRefType)(Switch);
export { _Switch as Switch };

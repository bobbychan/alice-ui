import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import React, { ForwardedRef, createContext, forwardRef, useState } from 'react';
import {
  AriaRadioProps,
  VisuallyHidden,
  useFocusRing,
  useHover,
  usePress,
  useRadio,
} from 'react-aria';
import { RadioGroupState } from 'react-stately';
import {
  ContextValue,
  RenderProps,
  SlotProps,
  forwardRefType,
  removeDataAttributes,
  useContextProps,
  useRenderProps,
} from '../_utils/utils';

export interface RadioProps
  extends Omit<AriaRadioProps, 'children'>,
    RenderProps<RadioRenderProps>,
    SlotProps {}

export interface RadioRenderProps {
  /**
   * Whether the radio is selected.
   * @selector [data-selected]
   */
  isSelected: boolean;
  /**
   * Whether the radio is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the radio is currently in a pressed state.
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the radio is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the radio is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the radio is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the radio is read only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the radio is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * Whether the checkbox is required.
   * @selector [data-required]
   */
  isRequired: boolean;
}

export const RadioContext =
  createContext<ContextValue<Partial<RadioProps>, HTMLInputElement>>(null);
export const InternalRadioContext = createContext<RadioGroupState | null>(null);

function Radio(props: RadioProps, ref: ForwardedRef<HTMLInputElement>) {
  [props, ref] = useContextProps(props, ref, RadioContext);
  let state = React.useContext(InternalRadioContext)!;
  let domRef = useObjectRef(ref);
  let {
    inputProps,
    isSelected,
    isDisabled,
    isPressed: isPressedKeyboard,
  } = useRadio(
    {
      ...removeDataAttributes<RadioProps>(props),
      // ReactNode type doesn't allow function children.
      children: typeof props.children === 'function' ? true : props.children,
    },
    state,
    domRef,
  );
  let { isFocused, isFocusVisible, focusProps } = useFocusRing();
  let interactionDisabled = isDisabled || state.isReadOnly;

  // Handle press state for full label. Keyboard press state is returned by useRadio
  // since it is handled on the <input> element itself.
  let [isPressed, setPressed] = useState(false);
  let { pressProps } = usePress({
    isDisabled: interactionDisabled,
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

  let { hoverProps, isHovered } = useHover({
    isDisabled: interactionDisabled,
  });

  let pressed = interactionDisabled ? false : isPressed || isPressedKeyboard;

  let renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-Radio',
    values: {
      isSelected,
      isPressed: pressed,
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled,
      isReadOnly: state.isReadOnly,
      isInvalid: state.isInvalid,
      isRequired: state.isRequired,
    },
  });

  let DOMProps = filterDOMProps(props);
  delete DOMProps.id;

  return (
    <label
      {...mergeProps(DOMProps, pressProps, hoverProps, renderProps)}
      data-selected={isSelected || undefined}
      data-pressed={pressed || undefined}
      data-hovered={isHovered || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
      data-disabled={isDisabled || undefined}
      data-readonly={state.isReadOnly || undefined}
      data-invalid={state.isInvalid || undefined}
      data-required={state.isRequired || undefined}
    >
      <VisuallyHidden elementType="span">
        <input {...mergeProps(inputProps, focusProps)} ref={domRef} />
      </VisuallyHidden>
      {renderProps.children}
    </label>
  );
}

/**
 * A radio represents an individual option within a radio group.
 */
const _Radio = (forwardRef as forwardRefType)(Radio);

export { _Radio as Radio };

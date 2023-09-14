import { createContext, ForwardedRef, InputHTMLAttributes } from 'react';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import {
  ContextValue,
  createHideableComponent,
  dataAttr,
  StyleRenderProps,
  useContextProps,
  useRenderProps,
} from '../_utils/utils';

export interface InputRenderProps {
  /**
   * Whether the input is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the input is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the input is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the input is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the input is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'>,
    StyleRenderProps<InputRenderProps> {}

export const InputContext = createContext<ContextValue<InputProps, HTMLInputElement>>({});

function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  [props, ref] = useContextProps(props, ref, InputContext);

  const { hoverProps, isHovered } = useHover({});
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    isTextInput: true,
    autoFocus: props.autoFocus,
  });

  const isInvalid = !!props['aria-invalid'] && props['aria-invalid'] !== 'false';
  const renderProps = useRenderProps({
    ...props,
    values: {
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled: props.disabled || false,
      isInvalid,
    },
    defaultClassName: 'react-aria-Input',
  });

  return (
    <input
      {...mergeProps(props, focusProps, hoverProps)}
      {...renderProps}
      ref={ref}
      data-focused={dataAttr(isFocused)}
      data-disabled={dataAttr(props.disabled)}
      data-hovered={dataAttr(isHovered)}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-invalid={dataAttr(isInvalid)}
    />
  );
}

/**
 * An input allows a user to input text.
 */
const _Input = createHideableComponent(Input);
export { _Input as Input };

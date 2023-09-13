import { dataAttr } from '@alice-ui/shared-utils';
import { ForwardedRef, TextareaHTMLAttributes, createContext, forwardRef } from 'react';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import { ContextValue, StyleRenderProps, useContextProps, useRenderProps } from '../_util/utils';
import { InputRenderProps } from '../input';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'>,
    StyleRenderProps<InputRenderProps> {}

export const TextAreaContext = createContext<ContextValue<TextAreaProps, HTMLTextAreaElement>>({});

function TextArea(props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  [props, ref] = useContextProps(props, ref, TextAreaContext);

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
    defaultClassName: 'react-aria-TextArea',
  });

  return (
    <textarea
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
 * A textarea allows a user to input mult-line text.
 */
const _TextArea = forwardRef(TextArea);
export { _TextArea as TextArea };

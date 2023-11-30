'use client';

import { dataAttr } from '@alice-ui/shared-utils';
import { InputHTMLAttributes, Ref, TextareaHTMLAttributes, useCallback } from 'react';
import { mergeProps, useFocusRing, useHover, usePress } from 'react-aria';
import { useDOMRef } from '../_utils/utils';

export interface UseInputProps<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>
  extends Omit<InputHTMLAttributes<T> | TextareaHTMLAttributes<T>, 'ref'> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<T | null>;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  'data-value'?: string;
}

export function useInput<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(
  props: UseInputProps<T>,
) {
  const { ref, onClear, ...otherProps } = props;

  const domRef = useDOMRef<T>(ref);

  const handleClear = useCallback(() => {
    if (domRef?.current) {
      domRef.current.value = '';
      domRef.current.focus();
    }

    onClear?.();
  }, [domRef, onClear]);

  const { hoverProps, isHovered } = useHover({});
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    isTextInput: true,
    autoFocus: props.autoFocus,
  });
  const { focusProps: clearFocusProps, isFocusVisible: isClearButtonFocusVisible } = useFocusRing();
  const { pressProps: clearPressProps } = usePress({
    isDisabled: !!props?.disabled,
    onPress: handleClear,
  });

  const inputValue = props['data-value'];
  const isFilled = !!inputValue;
  const isInvalid = !!props['aria-invalid'] && props['aria-invalid'] !== 'false';

  const getInputWrapperProps = useCallback(
    (inputWrapperProps = {}) => {
      return {
        'data-filled': dataAttr(isFilled),
        'data-focused': dataAttr(isFocused),
        'data-focus-visible': dataAttr(isFocusVisible),
        'data-hovered': dataAttr(isHovered),
        'data-disabled': dataAttr(props.disabled),
        'data-invalid': dataAttr(isInvalid),
        ...inputWrapperProps,
      };
    },
    [isFilled, isFocusVisible, isFocused, isHovered, isInvalid, props.disabled],
  );

  const getInputProps = useCallback(
    (inputProps = {}) => {
      return {
        'data-filled': dataAttr(isFilled),
        ...mergeProps(otherProps, focusProps, hoverProps, inputProps),
        ref: domRef,
      };
    },
    [domRef, focusProps, hoverProps, isFilled, otherProps],
  );

  const getClearButtonProps = useCallback(
    (clearButtonProps = {}) => {
      return {
        role: 'button',
        tabIndex: 0,
        'data-focus-visible': dataAttr(isClearButtonFocusVisible),
        ...mergeProps(clearFocusProps, clearPressProps, clearButtonProps),
      };
    },
    [clearFocusProps, clearPressProps, isClearButtonFocusVisible],
  );

  return {
    domRef,
    getInputWrapperProps,
    getInputProps,
    getClearButtonProps,
  };
}

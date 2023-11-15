'use client';

import { XCircleFilledIcon } from '@alice-ui/icons';
import { clsx } from '@alice-ui/shared-utils';
import type { InputSlots, InputVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { input } from '@alice-ui/theme';
import { ForwardedRef, InputHTMLAttributes, forwardRef, useMemo } from 'react';
import { InputContext, useContextProps } from 'react-aria-components';
import { useInput } from './use-input';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'>,
    InputVariantProps {
  /**
   * Element to be rendered in the left side of the input.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the input.
   * if you pass this prop and the `onClear` prop, the passed element
   * will have the clear button props and it will be rendered instead of the
   * default clear button.
   */
  endContent?: React.ReactNode;
  /**
   * Classes object to style the input and its children.
   */
  classNames?: SlotsToClasses<InputSlots>;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  'data-value'?: string;
}

function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  [props, ref] = useContextProps(props, ref, InputContext);

  const {
    classNames,
    className,
    color,
    size,
    radius,
    variant,
    fullWidth,
    startContent,
    endContent,
    ...otherProps
  } = props;

  const { getInputWrapperProps, getInputProps, getClearButtonProps } = useInput({
    ...otherProps,
    ref,
  });

  const isClearable = !!props.onClear;

  const slots = useMemo(
    () => input({ color, size, radius, variant, fullWidth, isClearable }),
    [color, fullWidth, radius, size, variant, isClearable],
  );

  const end = useMemo(() => {
    if (isClearable) {
      return (
        <span
          {...getClearButtonProps()}
          className={slots.clearButton({ class: classNames?.clearButton })}
        >
          {endContent || <XCircleFilledIcon />}
        </span>
      );
    }

    return endContent;
  }, [classNames?.clearButton, endContent, getClearButtonProps, isClearable, slots]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <div className={slots.base({ class: baseStyles })} {...getInputWrapperProps()}>
      {startContent}
      <input {...getInputProps()} className={slots.input({ class: classNames?.input })} />
      {end}
    </div>
  );
}

/**
 * An input allows a user to input text.
 */
const _Input = forwardRef(Input);
export { _Input as Input };

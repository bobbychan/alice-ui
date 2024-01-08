'use client';

import { clsx } from '@alice-ui/shared-utils';
import type { SlotsToClasses, TextFieldSlots } from '@alice-ui/theme';
import { textField } from '@alice-ui/theme';
import { filterDOMProps } from '@react-aria/utils';
import { useControlledState } from '@react-stately/utils';
import type { Orientation } from '@react-types/shared';
import {
  ForwardedRef,
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import type { ContextValue, SlotProps } from 'react-aria-components';
import {
  InputContext,
  Label,
  Provider,
  Text,
  TextAreaContext,
  useContextProps,
} from 'react-aria-components';
import {
  DOMProps,
  RACValidation,
  forwardRefType,
  removeDataAttributes,
  useSlot,
} from '../_utils/utils';

export interface TextFieldProps
  extends Omit<
      AriaTextFieldProps,
      | 'label'
      | 'placeholder'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    RACValidation,
    DOMProps,
    SlotProps {
  /**
   * The content to display as the labe
   */
  label?: ReactNode;
  /**
   * The description of the text field.
   */
  description?: ReactNode;
  /**
   * The error message of the text field.
   */
  errorMessage?: ReactNode;
  /**
   * The axis the text field items should align with.
   * @default "vertical"
   */
  orientation?: Orientation;
  /** Whether the value is invalid. */
  isInvalid?: boolean;
  /**
   * React aria onChange event.
   */
  onValueChange?: (value: string) => void;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  /**
   * Classes object to style the text field and its children.
   */
  classNames?: SlotsToClasses<TextFieldSlots>;
}

export const TextFieldContext = createContext<ContextValue<TextFieldProps, HTMLDivElement>>(null);

function TextField(props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, TextFieldContext);
  let inputRef = useRef(null);
  let [labelRef, label] = useSlot();
  let [inputElementType, setInputElementType] = useState('input');

  const {
    onValueChange = () => {},
    onClear,
    className,
    classNames,
    children,
    label: labelValue,
    description,
    errorMessage,
  } = props;

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? '');
    },
    [onValueChange],
  );

  const [inputValue, setInputValue] = useControlledState<any>(
    props.value,
    props.defaultValue,
    handleValueChange,
  );

  const handleValueClear = useCallback(() => {
    setInputValue('');
    onClear?.();
  }, [onClear, setInputValue]);

  let { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField<any>(
    {
      ...removeDataAttributes(props),
      value: inputValue,
      inputElementType,
      label,
      onChange: setInputValue,
    },
    inputRef,
  );

  // Intercept setting the input ref so we can determine what kind of element we have.
  // useTextField uses this to determine what props to include.
  let inputOrTextAreaRef = useCallback((el: any) => {
    inputRef.current = el;
    if (el) {
      setInputElementType(el instanceof HTMLTextAreaElement ? 'textarea' : 'input');
    }
  }, []);

  const baseStyles = clsx(classNames?.base, className);
  const slots = useMemo(() => textField(), []);

  const hasHelper = !!description || !!errorMessage;

  const helpComponent = useMemo(() => {
    if (!hasHelper) return null;

    return errorMessage ? (
      <Text
        slot="errorMessage"
        elementType="div"
        className={slots.errorMessage({ class: classNames?.errorMessage })}
        {...errorMessageProps}
      >
        {errorMessage}
      </Text>
    ) : description ? (
      <Text
        slot="description"
        elementType="div"
        className={slots.description({ class: classNames?.description })}
        {...descriptionProps}
      >
        {description}
      </Text>
    ) : null;
  }, [
    classNames?.description,
    classNames?.errorMessage,
    description,
    descriptionProps,
    errorMessage,
    errorMessageProps,
    hasHelper,
    slots,
  ]);

  return (
    <div
      {...filterDOMProps(props)}
      className={slots.base({ class: baseStyles })}
      ref={ref}
      slot={props.slot || undefined}
      data-disabled={props.isDisabled || undefined}
      data-invalid={props.isInvalid || undefined}
      data-required={props.isRequired || undefined}
      data-readonly={props.isReadOnly || undefined}
      data-orientation={props.orientation || 'vertical'}
    >
      <Provider
        values={[
          [
            InputContext,
            {
              ...inputProps,
              'data-value': inputValue,
              onClear: onClear ? handleValueClear : undefined,
              ref: inputOrTextAreaRef,
            },
          ],
          [
            TextAreaContext,
            {
              ...inputProps,
              'data-value': inputValue,
              onClear: onClear ? handleValueClear : undefined,
              ref: inputOrTextAreaRef,
            },
          ],
        ]}
      >
        {labelValue && (
          <Label
            {...labelProps}
            ref={labelRef}
            className={slots.label({ class: classNames?.label })}
          >
            {labelValue}
          </Label>
        )}
        {children}
        {helpComponent}
      </Provider>
    </div>
  );
}

/**
 * A text field allows a user to enter a plain text value with a keyboard.
 */
const _TextField = (forwardRef as forwardRefType)(TextField);
export { _TextField as TextField };

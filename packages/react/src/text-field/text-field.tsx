import { clsx } from '@alice-ui/shared-utils';
import type { SlotsToClasses, TextFieldSlots } from '@alice-ui/theme';
import { textField } from '@alice-ui/theme';
import { filterDOMProps } from '@react-aria/utils';
import { useControlledState } from '@react-stately/utils';
import type { Orientation } from '@react-types/shared';
import {
  ForwardedRef,
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
  LabelContext,
  Provider,
  TextAreaContext,
  TextContext,
  useContextProps,
} from 'react-aria-components';
import { DOMProps, forwardRefType, removeDataAttributes, useSlot } from '../_utils/utils';

export interface TextFieldProps
  extends Omit<
      AriaTextFieldProps,
      'label' | 'placeholder' | 'description' | 'errorMessage' | 'validationState'
    >,
    DOMProps,
    SlotProps {
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
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <div classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<TextFieldSlots>;
}

export const TextFieldContext = createContext<ContextValue<TextFieldProps, HTMLDivElement>>(null);

function TextField(props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, TextFieldContext);
  let inputRef = useRef(null);
  let [labelRef, label] = useSlot();
  let [inputElementType, setInputElementType] = useState('input');

  const { onValueChange = () => {}, onClear, className, classNames, children } = props;

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? '');
    },
    [onValueChange],
  );

  const [inputValue, setInputValue] = useControlledState<string | undefined>(
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
            LabelContext,
            { ...labelProps, className: slots.label({ class: classNames?.label }), ref: labelRef },
          ],
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
          [
            TextContext,
            {
              slots: {
                description: {
                  elementType: 'div',
                  className: slots.description({ class: classNames?.description }),
                  ...descriptionProps,
                },
                errorMessage: {
                  elementType: 'div',
                  className: slots.errorMessage({ class: classNames?.errorMessage }),
                  ...errorMessageProps,
                },
              },
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </div>
  );
}

/**
 * A text field allows a user to enter a plain text value with a keyboard.
 */
const _TextField = (forwardRef as forwardRefType)(TextField);
export { _TextField as TextField };

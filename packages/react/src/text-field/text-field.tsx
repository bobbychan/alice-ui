import { dataAttr } from '@alice-ui/shared-utils';
import { filterDOMProps } from '@react-aria/utils';
import { ForwardedRef, createContext, forwardRef, useCallback, useRef, useState } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import {
  ContextValue,
  DOMProps,
  Provider,
  RenderProps,
  SlotProps,
  forwardRefType,
  useContextProps,
  useRenderProps,
  useSlot,
} from '../_utils/utils';
import { InputContext } from '../input';
import { LabelContext } from '../label';
import { TextContext } from '../text';
import { TextAreaContext } from '../textarea';

export interface TextFieldRenderProps {
  /**
   * Whether the text field is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the value is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export interface TextFieldProps
  extends Omit<
      AriaTextFieldProps,
      'label' | 'placeholder' | 'description' | 'errorMessage' | 'validationState'
    >,
    Omit<DOMProps, 'style' | 'className' | 'children'>,
    SlotProps,
    RenderProps<TextFieldRenderProps> {
  /** Whether the value is invalid. */
  isInvalid?: boolean;
}

export const TextFieldContext = createContext<ContextValue<TextFieldProps, HTMLDivElement>>(null);

function TextField(props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, TextFieldContext);
  const inputRef = useRef(null);
  const [labelRef, label] = useSlot();
  const [inputElementType, setInputElementType] = useState('input');
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField<any>(
    {
      ...props,
      inputElementType,
      label,
    },
    inputRef,
  );

  // Intercept setting the input ref so we can determine what kind of element we have.
  // useTextField uses this to determine what props to include.
  const inputOrTextAreaRef = useCallback((el: any) => {
    inputRef.current = el;
    if (el) {
      setInputElementType(el instanceof HTMLTextAreaElement ? 'textarea' : 'input');
    }
  }, []);

  const renderProps = useRenderProps({
    ...props,
    values: {
      isDisabled: props.isDisabled || false,
      isInvalid: props.isInvalid || false,
    },
    defaultClassName: 'react-aria-TextField',
  });

  return (
    <div
      {...filterDOMProps(props)}
      {...renderProps}
      ref={ref}
      slot={props.slot}
      data-disabled={dataAttr(props.isDisabled)}
      data-invalid={dataAttr(props.isInvalid)}
    >
      <Provider
        values={[
          [LabelContext, { ...labelProps, ref: labelRef }],
          [InputContext, { ...inputProps, ref: inputOrTextAreaRef }],
          [TextAreaContext, { ...inputProps, ref: inputOrTextAreaRef }],
          [
            TextContext,
            {
              slots: {
                description: descriptionProps,
                errorMessage: errorMessageProps,
              },
            },
          ],
        ]}
      >
        {renderProps.children}
      </Provider>
    </div>
  );
}

/**
 * A text field allows a user to enter a plain text value with a keyboard.
 */
const _TextField = (forwardRef as forwardRefType)(TextField);
export { _TextField as TextField };

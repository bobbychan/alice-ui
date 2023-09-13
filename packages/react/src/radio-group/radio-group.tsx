import { ForwardedRef, createContext, forwardRef } from 'react';
import { AriaRadioGroupProps, Orientation, useRadioGroup } from 'react-aria';
import { RadioGroupState, useRadioGroupState } from 'react-stately';
import {
  ContextValue,
  Provider,
  RenderProps,
  SlotProps,
  forwardRefType,
  useContextProps,
  useRenderProps,
  useSlot,
} from '../_util/utils';
import { LabelContext } from '../label';
import { TextContext } from '../text';
import { InternalRadioContext } from './radio';

export interface RadioGroupProps
  extends Omit<
      AriaRadioGroupProps,
      'children' | 'label' | 'description' | 'errorMessage' | 'validationState'
    >,
    RenderProps<RadioGroupRenderProps>,
    SlotProps {}

export interface RadioGroupRenderProps {
  /**
   * The orientation of the radio group.
   * @selector [data-orientation="horizontal | vertical"]
   */
  orientation: Orientation;
  /**
   * Whether the radio group is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the radio group is read only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the radio group is required.
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether the radio group is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * State of the radio group.
   */
  state: RadioGroupState;
}

export const RadioGroupContext = createContext<ContextValue<RadioGroupProps, HTMLDivElement>>(null);

function RadioGroup(props: RadioGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, RadioGroupContext);
  let state = useRadioGroupState(props);
  let [labelRef, label] = useSlot();
  let { radioGroupProps, labelProps, descriptionProps, errorMessageProps } = useRadioGroup(
    {
      ...props,
      label,
    },
    state,
  );

  let renderProps = useRenderProps({
    ...props,
    values: {
      orientation: props.orientation || 'vertical',
      isDisabled: state.isDisabled,
      isReadOnly: state.isReadOnly,
      isRequired: state.isRequired,
      isInvalid: state.isInvalid,
      state,
    },
    defaultClassName: 'react-aria-RadioGroup',
  });

  return (
    <div
      {...radioGroupProps}
      {...renderProps}
      ref={ref}
      slot={props.slot}
      data-orientation={props.orientation || 'vertical'}
      data-invalid={state.isInvalid || undefined}
      data-disabled={state.isDisabled || undefined}
      data-readonly={state.isReadOnly || undefined}
      data-required={state.isRequired || undefined}
    >
      <Provider
        values={[
          [InternalRadioContext, state],
          [LabelContext, { ...labelProps, ref: labelRef, elementType: 'span' }],
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
 * A radio group allows a user to select a single item from a list of mutually exclusive options.
 */
const _RadioGroup = (forwardRef as forwardRefType)(RadioGroup);

export { _RadioGroup as RadioGroup };

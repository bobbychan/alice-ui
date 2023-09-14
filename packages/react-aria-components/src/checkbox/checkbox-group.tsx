import { createContext, ForwardedRef, forwardRef } from 'react';
import { AriaCheckboxGroupProps, useCheckboxGroup } from 'react-aria';
import { CheckboxGroupState, useCheckboxGroupState } from 'react-stately';
import {
  ContextValue,
  forwardRefType,
  Provider,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
  useSlot,
} from '../_utils/utils';
import { LabelContext } from '../label';
import { TextContext } from '../text';

export interface CheckboxGroupProps
  extends Omit<
      AriaCheckboxGroupProps,
      'children' | 'label' | 'description' | 'errorMessage' | 'validationState'
    >,
    RenderProps<CheckboxGroupRenderProps>,
    SlotProps {}

export interface CheckboxGroupRenderProps {
  /**
   * Whether the checkbox group is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the checkbox group is read only.
   * @selector [data-readonly]
   */
  isReadOnly: boolean;
  /**
   * Whether the checkbox group is required.
   * @selector [data-required]
   */
  isRequired: boolean;
  /**
   * Whether the checkbox group is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * State of the checkbox group.
   */
  state: CheckboxGroupState;
}

export const CheckboxGroupContext =
  createContext<ContextValue<CheckboxGroupProps, HTMLDivElement>>(null);
export const InternalCheckboxGroupContext = createContext<CheckboxGroupState | null>(null);

function CheckboxGroup(props: CheckboxGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, CheckboxGroupContext);
  let state = useCheckboxGroupState(props);
  let [labelRef, label] = useSlot();
  let { groupProps, labelProps, descriptionProps, errorMessageProps } = useCheckboxGroup(
    {
      ...props,
      label,
    },
    state,
  );

  let renderProps = useRenderProps({
    ...props,
    values: {
      isDisabled: state.isDisabled,
      isReadOnly: state.isReadOnly,
      isRequired: props.isRequired || false,
      isInvalid: state.isInvalid,
      state,
    },
    defaultClassName: 'react-aria-CheckboxGroup',
  });

  return (
    <div
      {...groupProps}
      {...renderProps}
      ref={ref}
      slot={props.slot}
      data-readonly={state.isReadOnly || undefined}
      data-required={props.isRequired || undefined}
      data-invalid={state.isInvalid || undefined}
      data-disabled={props.isDisabled || undefined}
    >
      <Provider
        values={[
          [InternalCheckboxGroupContext, state],
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
 * A checkbox group allows a user to select multiple items from a list of options.
 */
const _CheckboxGroup = /*#__PURE__*/ (forwardRef as forwardRefType)(CheckboxGroup);

export { _CheckboxGroup as CheckboxGroup };

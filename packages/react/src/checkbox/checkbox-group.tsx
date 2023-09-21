import { clsx } from '@alice-ui/shared-utils';
import type { CheckboxGroupSlots, SlotsToClasses } from '@alice-ui/theme';
import { checkboxGroup } from '@alice-ui/theme';
import type { Orientation } from '@react-types/shared';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import type { CheckboxGroupProps as AriaCheckboxGroupProps } from 'react-aria-components';
import { CheckboxGroup as AriaCheckboxGroup, Label, Text } from 'react-aria-components';
import { CheckboxProps } from './checkbox';

export interface CheckboxGroupProps
  extends AriaCheckboxGroupProps,
    Partial<Pick<CheckboxProps, 'color' | 'size' | 'radius' | 'lineThrough' | 'isDisabled'>> {
  /**
   * The axis the checkbox group items should align with.
   * @default "vertical"
   */
  orientation?: Orientation;
  label?: string;
  description?: string;
  errorMessage?: string;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <CheckboxGroup classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    wrapper: "wrapper-classes", // checkboxes wrapper
   * }} >
   *  // checkboxes
   * </CheckboxGroup>
   * ```
   */
  classNames?: SlotsToClasses<CheckboxGroupSlots>;
}

function CheckboxGroup(props: CheckboxGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    orientation = 'vertical',
    isRequired,
    isInvalid,
    label,
    description,
    errorMessage,
    className,
    classNames,
    children,
    ...otherProps
  } = props;

  const slots = useMemo(
    () =>
      checkboxGroup({
        isRequired,
        isInvalid,
      }),
    [isInvalid, isRequired],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AriaCheckboxGroup ref={ref} className={slots.base({ class: baseStyles })} {...props}>
      {(renderProps) => (
        <>
          {label && <Label className={slots.label({ class: classNames?.label })}>{label}</Label>}
          {children && (
            <div
              data-orientation={orientation}
              className={slots.wrapper({ class: classNames?.wrapper })}
            >
              {typeof children === 'function' ? children(renderProps) : children}
            </div>
          )}

          {!renderProps.isInvalid && description && (
            <Text
              slot="description"
              className={slots.description({ class: classNames?.description })}
            >
              {description}
            </Text>
          )}
          {renderProps.isInvalid && errorMessage && (
            <Text
              slot="errorMessage"
              className={slots.errorMessage({ class: classNames?.errorMessage })}
            >
              {errorMessage}
            </Text>
          )}
        </>
      )}
    </AriaCheckboxGroup>
  );
}

/**
 * A checkbox group allows a user to select multiple items from a list of options.
 */
const _CheckboxGroup = forwardRef(CheckboxGroup);

export { _CheckboxGroup as CheckboxGroup };

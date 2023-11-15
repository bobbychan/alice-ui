'use client';

import { clsx } from '@alice-ui/shared-utils';
import type { RadioGroupSlots, SlotsToClasses } from '@alice-ui/theme';
import { RadioVariantProps, radioGroup } from '@alice-ui/theme';
import { ForwardedRef, ReactNode, createContext, forwardRef, useMemo } from 'react';
import type { RadioGroupProps as AriaRadioGroupProps } from 'react-aria-components';
import { RadioGroup as AriaRadioGroup, Label, Text } from 'react-aria-components';
import { RadioProps } from './radio';

export interface RadioGroupProps
  extends AriaRadioGroupProps,
    Partial<Pick<RadioProps, 'color' | 'size' | 'isDisabled'>> {
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <RadioGroup classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    wrapper: "wrapper-classes"
   * }} >
   *  // radio
   * </RadioGroup>
   * ```
   */
  classNames?: SlotsToClasses<RadioGroupSlots>;
  className?: string;
}

export const RadioGroupThemeContext = createContext<RadioVariantProps>({});

function RadioGroup(props: RadioGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  const { label, className, classNames, color, size, children, ...otherProps } = props;

  const slots = useMemo(() => radioGroup(), []);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AriaRadioGroup
      ref={ref}
      className={slots.base({ class: baseStyles })}
      aria-label={
        otherProps['aria-label'] || typeof label === 'string' ? (label as string) : undefined
      }
      {...otherProps}
    >
      {(renderProps) => (
        <>
          {label && <Label className={slots.label({ class: classNames?.label })}>{label}</Label>}
          {children && (
            <div className={slots.wrapper({ class: classNames?.wrapper })}>
              <RadioGroupThemeContext.Provider value={{ color, size }}>
                {typeof children === 'function' ? children(renderProps) : children}
              </RadioGroupThemeContext.Provider>
            </div>
          )}

          {props.errorMessage ? (
            <Text
              slot="errorMessage"
              className={slots.errorMessage({ class: classNames?.errorMessage })}
            >
              {props.errorMessage}
            </Text>
          ) : props.description ? (
            <Text
              slot="description"
              className={slots.description({ class: classNames?.description })}
            >
              {props.description}
            </Text>
          ) : null}
        </>
      )}
    </AriaRadioGroup>
  );
}

/**
 * A radio group allows a user to select multiple items from a list of options.
 */
const _RadioGroup = forwardRef(RadioGroup);

export { _RadioGroup as RadioGroup };

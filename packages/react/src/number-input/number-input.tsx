import { clsx } from '@alice-ui/shared-utils';
import type {
  ButtonVariantProps,
  NumberInputSlots,
  NumberInputVariantProps,
  SlotsToClasses,
} from '@alice-ui/theme';
import { button, numberInput } from '@alice-ui/theme';
import { ReactNode, useMemo } from 'react';
import type { NumberFieldProps, ValidationResult } from 'react-aria-components';
import { Button, FieldError, Group, Label, NumberField, Text } from 'react-aria-components';
import { Input, InputProps } from '../input';

export interface NumberInputProps extends NumberFieldProps, NumberInputVariantProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  buttonProps?: ButtonVariantProps;
  inputProps?: InputProps;
  placeholder?: string;
  /**
   * The decrement content to display inside the button.
   */
  decrementContent?: ReactNode;
  /**
   * The increment content to display inside the button.
   */
  incrementContent?: ReactNode;
  /**
   * Classes object to style the number input and its children.
   */
  classNames?: SlotsToClasses<NumberInputSlots>;
}

function NumberInput(props: NumberInputProps) {
  const {
    className,
    classNames,
    label,
    description,
    errorMessage,
    decrementContent = '-',
    incrementContent = '+',
    isCompact = false,
    placeholder,
    buttonProps,
    inputProps,
    ...otherProps
  } = props;

  const slots = useMemo(
    () =>
      numberInput({
        isCompact,
      }),
    [isCompact],
  );

  const buttonStyles = useMemo(
    () =>
      button({
        isIconOnly: true,
        ...buttonProps,
      }),
    [buttonProps],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <NumberField className={slots.base({ class: baseStyles })} {...otherProps}>
      {label && <Label className={slots.label({ class: classNames?.label })}>{label}</Label>}
      <Group className={slots.wrapper({ class: classNames?.wrapper })}>
        <Button
          slot="decrement"
          data-stepper="decrement"
          className={slots.button({ class: clsx(buttonStyles, classNames?.button) })}
          style={{ zIndex: 10 }}
        >
          {decrementContent}
        </Button>
        <Input
          {...inputProps}
          placeholder={placeholder}
          className={slots.input({ class: classNames?.input })}
        />
        <Button
          slot="increment"
          data-stepper="increment"
          className={slots.button({ class: clsx(buttonStyles, classNames?.button) })}
        >
          {incrementContent}
        </Button>
      </Group>
      {description && (
        <Text slot="description" className={slots.description({ class: classNames?.description })}>
          {description}
        </Text>
      )}
      <FieldError className={slots.errorMessage({ class: classNames?.errorMessage })}>
        {errorMessage}
      </FieldError>
    </NumberField>
  );
}

export { NumberInput };

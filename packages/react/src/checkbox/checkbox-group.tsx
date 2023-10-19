import { clsx } from '@alice-ui/shared-utils';
import type { CheckboxGroupSlots, CheckboxVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { checkboxGroup } from '@alice-ui/theme';
import type { Orientation } from '@react-types/shared';
import { ForwardedRef, ReactNode, createContext, forwardRef, useMemo } from 'react';
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
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
  /**
   * Classes object to style the checkbox group and its children.
   */
  classNames?: SlotsToClasses<CheckboxGroupSlots>;
  className?: string;
}

export const CheckboxGroupThemeContext = createContext<CheckboxVariantProps>({});

function CheckboxGroup(props: CheckboxGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    color,
    size,
    radius,
    lineThrough,
    orientation = 'vertical',
    label,
    className,
    classNames,
    children,
    ...otherProps
  } = props;

  const slots = useMemo(() => checkboxGroup(), []);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AriaCheckboxGroup
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
            <div
              data-orientation={orientation}
              className={slots.wrapper({ class: classNames?.wrapper })}
            >
              <CheckboxGroupThemeContext.Provider value={{ color, size, radius, lineThrough }}>
                {typeof children === 'function' ? children(renderProps) : children}
              </CheckboxGroupThemeContext.Provider>
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
    </AriaCheckboxGroup>
  );
}

/**
 * A checkbox group allows a user to select multiple items from a list of options.
 */
const _CheckboxGroup = forwardRef(CheckboxGroup);

export { _CheckboxGroup as CheckboxGroup };

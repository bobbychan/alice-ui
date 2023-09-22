import { clsx } from '@alice-ui/shared-utils';
import type { RadioSlots, RadioVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { radio } from '@alice-ui/theme';
import {
  ForwardedRef,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
} from 'react';
import type { RadioProps as AriaRadioProps } from 'react-aria-components';
import { Radio as AriaRadio } from 'react-aria-components';
import { RadioGroupThemeContext } from './radio-group';

export interface RadioIconProps {
  'data-checked'?: string;
  isSelected?: boolean;
  className?: string;
}

export interface RadioProps extends AriaRadioProps, RadioVariantProps {
  /**
   * The content to be displayed as the radio control.
   */
  control?: ReactNode | ((props: RadioIconProps) => ReactNode);
  /**
   * Whether the radio control should be displayed.
   */
  isDisplayControl?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Radio classNames={{
   *    base:"base-classes",
   *    control: "control-classes",
   *    label: "label-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<RadioSlots>;
  className?: string;
}

function Radio(props: RadioProps, ref: ForwardedRef<HTMLInputElement>) {
  const groupThemeContext = useContext(RadioGroupThemeContext);

  const {
    size = groupThemeContext?.size ?? 'md',
    color = groupThemeContext?.color ?? 'primary',
    control,
    isDisplayControl = true,
    className,
    classNames,
    children,
    ...otherProps
  } = props;

  const slots = useMemo(
    () =>
      radio({
        color,
        size,
      }),
    [color, size],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AriaRadio ref={ref} className={slots.base({ class: baseStyles })} {...otherProps}>
      {(renderProps) => {
        const iconProps = {
          'data-checked': String(renderProps.isSelected),
          isSelected: renderProps.isSelected,
        };

        let clonedControl;
        if (typeof control === 'function') {
          clonedControl = control(iconProps);
        } else if (isValidElement(control)) {
          clonedControl = cloneElement(control, iconProps);
        } else {
          const controlClass =
            renderProps.isHovered && !renderProps.isSelected
              ? clsx(classNames?.control, 'bg-default-100')
              : classNames?.control;

          clonedControl = (
            <span aria-hidden="true" className={slots.control({ class: controlClass })}>
              <span className={slots.point({ class: classNames?.point })} />
            </span>
          );
        }

        const displayControl = isDisplayControl && clonedControl;

        return (
          <>
            {displayControl}
            {children && (
              <span className={slots.label({ class: classNames?.label })}>
                {typeof children === 'function' ? children(renderProps) : children}
              </span>
            )}
          </>
        );
      }}
    </AriaRadio>
  );
}

/**
 * A checkbox allows a user to select multiple items from a list of individual items, or
 * to mark one individual item as selected.
 */
const _Radio = forwardRef(Radio);

export { _Radio as Radio };

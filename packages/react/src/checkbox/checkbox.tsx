import { clsx } from '@alice-ui/shared-utils';
import type { CheckboxSlots, CheckboxVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { checkbox } from '@alice-ui/theme';
import {
  ForwardedRef,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { CheckboxGroupThemeContext } from './checkbox-group';
import { CheckboxIcon, CheckboxIconProps } from './checkbox-icon';

export interface CheckboxProps extends AriaCheckboxProps, CheckboxVariantProps {
  /**
   * The icon to be displayed when the checkbox is checked.
   */
  icon?: ReactNode | ((props: CheckboxIconProps) => ReactNode);
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Checkbox classNames={{
   *    base:"base-classes",
   *    control: "control-classes",
   *    icon: "icon-classes",
   *    label: "label-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CheckboxSlots>;
  className?: string;
}

function Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) {
  const groupThemeContext = useContext(CheckboxGroupThemeContext);

  const {
    icon = <CheckboxIcon />,
    size = groupThemeContext?.size ?? 'md',
    color = groupThemeContext?.color ?? 'primary',
    radius = groupThemeContext?.radius,
    lineThrough = groupThemeContext?.lineThrough ?? false,
    className,
    classNames,
    children,
    ...otherProps
  } = props;

  const slots = useMemo(
    () =>
      checkbox({
        color,
        size,
        radius,
        lineThrough,
      }),
    [color, lineThrough, radius, size],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AriaCheckbox ref={ref} className={slots.base({ class: baseStyles })} {...otherProps}>
      {(renderProps) => {
        const iconProps = {
          'data-checked': String(renderProps.isSelected),
          isSelected: renderProps.isSelected,
          isIndeterminate: renderProps.isIndeterminate,
          className: slots.icon({ class: classNames?.icon }),
        };
        const clonedIcon =
          typeof icon === 'function'
            ? icon(iconProps)
            : cloneElement(icon as ReactElement, iconProps);

        return (
          <>
            <span aria-hidden="true" className={slots.control({ class: classNames?.control })}>
              {clonedIcon}
            </span>
            {children && (
              <span className={slots.label({ class: classNames?.label })}>
                {typeof children === 'function' ? children(renderProps) : children}
              </span>
            )}
          </>
        );
      }}
    </AriaCheckbox>
  );
}

/**
 * A checkbox allows a user to select multiple items from a list of individual items, or
 * to mark one individual item as selected.
 */
const _Checkbox = forwardRef(Checkbox);

export { _Checkbox as Checkbox };

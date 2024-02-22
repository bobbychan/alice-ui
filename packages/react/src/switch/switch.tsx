import { clsx } from '@alice-ui/shared-utils';
import type { SlotsToClasses, ToggleSlots, ToggleVariantProps } from '@alice-ui/theme';
import { toggle } from '@alice-ui/theme';
import { ForwardedRef, ReactElement, ReactNode, cloneElement, forwardRef, useMemo } from 'react';
import type { SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { Switch as AriaSwitch } from 'react-aria-components';

export type SwitchThumbIconProps = {
  width: string;
  height: string;
  'data-checked': string;
  isSelected: boolean;
  className: string;
};

export interface SwitchProps extends AriaSwitchProps, ToggleVariantProps {
  /**
   * The icon to be displayed inside the thumb.
   */
  thumbIcon?: ReactNode | ((props: SwitchThumbIconProps) => ReactNode);
  /**
   * Classes object to style the switch and its children.
   */
  classNames?: SlotsToClasses<ToggleSlots>;
  className?: string;
}

function Switch(props: SwitchProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { children, classNames, className, color, size, thumbIcon, ...otherProps } = props;

  const slots = useMemo(() => toggle({ color, size }), [color, size]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AriaSwitch ref={ref} className={slots.base({ class: baseStyles })} {...otherProps}>
      {(renderProps) => {
        const thumbIconProps = {
          'data-checked': String(renderProps.isSelected),
          isSelected: renderProps.isSelected,
          className: slots.thumbIcon({ class: classNames?.thumbIcon }),
          width: '1em',
          height: '1em',
        };
        const clonedThumbIcon =
          typeof thumbIcon === 'function'
            ? thumbIcon(thumbIconProps)
            : thumbIcon && cloneElement(thumbIcon as ReactElement, thumbIconProps);

        return (
          <>
            <span aria-hidden="true" className={slots.wrapper({ class: classNames?.wrapper })}>
              <span className={slots.thumb({ class: classNames?.thumb })}>
                {thumbIcon && clonedThumbIcon}
              </span>
            </span>
            {children && (
              <span className={slots.label({ class: classNames?.label })}>
                {typeof children === 'function' ? children(renderProps) : children}
              </span>
            )}
          </>
        );
      }}
    </AriaSwitch>
  );
}

/**
 * A switch allows a user to turn a setting on or off.
 */
const _Switch = forwardRef(Switch);
export { _Switch as Switch };

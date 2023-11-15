'use client';

import type { ButtonVariantProps } from '@alice-ui/theme';
import { button } from '@alice-ui/theme';
import { ForwardedRef, cloneElement, forwardRef, isValidElement, useMemo } from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';

export interface IconButtonProps
  extends Omit<AriaButtonProps, 'className'>,
    Omit<ButtonVariantProps, 'isInGroup' | 'fullWidth'> {
  /**
   * A11y: A label that describes the button
   */
  'aria-label': string;
  className: string;
}

function IconButton(props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    variant,
    color,
    size = 'md',
    radius,
    isDisabled,
    disableAnimation,
    className,
    children,
    ...otherProps
  } = props;

  const styles = useMemo(
    () =>
      button({
        isIconOnly: true,
        size,
        color,
        variant,
        radius,
        isDisabled,
        disableAnimation,
        className,
      }),
    [className, color, disableAnimation, isDisabled, radius, size, variant],
  );

  const element = children;
  const _children = isValidElement(element)
    ? cloneElement(element as any, {
        'aria-hidden': true,
        focusable: false,
      })
    : null;

  return (
    <AriaButton ref={ref} className={styles} {...otherProps}>
      {_children}
    </AriaButton>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _IconButton = forwardRef(IconButton);
export { _IconButton as IconButton };

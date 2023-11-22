'use client';

import { XMarkIcon } from '@alice-ui/icons';
import type { CloseButtonVariantProps } from '@alice-ui/theme';
import { closeButton } from '@alice-ui/theme';
import { ForwardedRef, cloneElement, forwardRef, isValidElement, useMemo } from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';

export interface CloseButtonProps
  extends Omit<AriaButtonProps, 'className'>,
    CloseButtonVariantProps {
  className?: string;
}

function CloseButton(props: CloseButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { variant, color, size = 'md', radius, className, children, ...otherProps } = props;

  const styles = useMemo(
    () =>
      closeButton({
        size,
        color,
        variant,
        radius,
        className,
      }),
    [className, color, radius, size, variant],
  );

  const element = children;
  const _children = isValidElement(element) ? (
    cloneElement(element as any, {
      'aria-hidden': true,
      focusable: false,
    })
  ) : (
    <XMarkIcon />
  );

  return (
    <AriaButton ref={ref} className={styles} aria-label="Close" {...otherProps}>
      {_children}
    </AriaButton>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _CloseButton = forwardRef(CloseButton);
export { _CloseButton as CloseButton };

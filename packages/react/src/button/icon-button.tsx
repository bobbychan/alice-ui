import type { ButtonVariantProps } from '@alice-ui/theme';
import { button } from '@alice-ui/theme';
import { ForwardedRef, cloneElement, forwardRef, isValidElement, useMemo } from 'react';
import type { BaseButtonProps } from './base-button';
import { BaseButton } from './base-button';

export interface IconButtonProps
  extends BaseButtonProps,
    Omit<ButtonVariantProps, 'isInGroup' | 'fullWidth'> {
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * A11y: A label that describes the button
   */
  'aria-label': string;
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
    <BaseButton ref={ref} className={styles} {...otherProps}>
      {_children}
    </BaseButton>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _IconButton = forwardRef(IconButton);
export { _IconButton as IconButton };

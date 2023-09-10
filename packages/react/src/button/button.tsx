import type { ButtonVariantProps } from '@alice-ui/theme';
import { button } from '@alice-ui/theme';
import { ForwardedRef, forwardRef, useCallback, useMemo } from 'react';
import { Ripple, useRipple } from '../ripple';
import type { BaseButtonProps } from './base-button';
import { BaseButton } from './base-button';

export interface ButtonProps extends BaseButtonProps, ButtonVariantProps {
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * Whether the button should display a loading spinner.
   * @default false
   */
  isLoading?: boolean;
}

function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    variant,
    color,
    size,
    radius,
    isDisabled,
    isIconOnly,
    fullWidth,
    disableAnimation,
    disableRipple,
    className,
    children,
    ...otherProps
  } = props;

  const { onClick: onRippleClickHandler, ripples } = useRipple();
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disableRipple || isDisabled || disableAnimation) return;
      onRippleClickHandler(e);
    },
    [disableRipple, isDisabled, disableAnimation, onRippleClickHandler],
  );

  const styles = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        disableAnimation,
        isIconOnly,
        className,
      }),
    [className, color, disableAnimation, fullWidth, isDisabled, isIconOnly, radius, size, variant],
  );

  return (
    <BaseButton ref={ref} className={styles} {...otherProps} onClick={handleClick}>
      <>{children}</>
      <span>bob</span>
      {!disableRipple && <Ripple ripples={ripples} />}
    </BaseButton>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _Button = forwardRef(Button);
export { _Button as Button };

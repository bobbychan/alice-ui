'use client';

import type { ButtonVariantProps } from '@alice-ui/theme';
import { button } from '@alice-ui/theme';
import {
  ForwardedRef,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
} from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';
import { Ripple, useRipple } from '../ripple';
import type { SpinnerProps } from '../spinner';
import { Spinner } from '../spinner';

export interface ButtonProps extends AriaButtonProps, Omit<ButtonVariantProps, 'isInGroup'> {
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * Adds icon before button label.
   */
  leftIcon?: ReactNode;
  /**
   * Adds icon after button label.
   */
  rightIcon?: ReactNode;
  /**
   * Spinner to display when loading.
   */
  spinner?: ReactNode;
  /**
   * Props to pass to the spinner.
   */
  spinnerProps?: SpinnerProps;
  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end';
  /**
   * Whether the button should display a loading spinner.
   * @default false
   */
  isLoading?: boolean;
  className?: string;
}

function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    variant,
    color,
    size = 'md',
    radius,
    isDisabled,
    fullWidth,
    isLoading,
    spinner = <Spinner color="current" size="sm" {...props.spinnerProps} />,
    spinnerPlacement = 'start',
    leftIcon,
    rightIcon,
    disableAnimation,
    disableRipple,
    className,
    children,
    ...otherProps
  } = props;

  const { onClick: onRippleClickHandler, ripples } = useRipple();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableRipple || disableAnimation || isLoading) return;
      onRippleClickHandler(e);
    },
    [disableRipple, disableAnimation, isLoading, onRippleClickHandler],
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
        className,
      }),
    [className, color, disableAnimation, fullWidth, isDisabled, radius, size, variant],
  );

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement<any>(icon, {
          'aria-hidden': true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const leftIconNode = getIconClone(leftIcon);
  const rightIconNode = getIconClone(rightIcon);

  return (
    // @ts-ignore
    <AriaButton ref={ref} className={styles} {...otherProps}>
      {({ isDisabled }) => (
        <>
          {leftIconNode}
          {isLoading && spinnerPlacement === 'start' && <div className="shrink-0">{spinner}</div>}
          <>{children}</>
          {isLoading && spinnerPlacement === 'end' && spinner}
          {rightIconNode}
          {(!disableRipple || !isDisabled) && (
            <>
              <div aria-hidden className="absolute inset-0 h-full w-full" onClick={handleClick} />
              <Ripple ripples={ripples} />
            </>
          )}
        </>
      )}
    </AriaButton>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _Button = forwardRef(Button);
export { _Button as Button };

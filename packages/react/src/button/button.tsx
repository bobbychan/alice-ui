import type { ButtonVariantProps } from '@alice-ui/theme';
import { button } from '@alice-ui/theme';
import { ForwardedRef, ReactNode, cloneElement, forwardRef, isValidElement, useMemo } from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';
import type { SpinnerProps } from '../spinner';
import { Spinner } from '../spinner';

export interface ButtonProps extends AriaButtonProps, Omit<ButtonVariantProps, 'isInGroup'> {
  /**
   * The button start content.
   */
  startContent?: ReactNode;
  /**
   * The button end content.
   */
  endContent?: ReactNode;
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
    fullWidth,
    isLoading,
    spinner = <Spinner color="current" size="sm" {...props.spinnerProps} />,
    spinnerPlacement = 'start',
    startContent: startContentProp,
    endContent: endContentProp,
    disableAnimation,
    className,
    children,
    ...otherProps
  } = props;

  const styles = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        disableAnimation,
        className,
      }),
    [className, color, disableAnimation, fullWidth, radius, size, variant],
  );

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement<any>(icon, {
          'aria-hidden': true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);

  return (
    <AriaButton ref={ref} className={styles} {...otherProps}>
      {startContent}
      {isLoading && spinnerPlacement === 'start' && <div className="shrink-0">{spinner}</div>}
      <>{children}</>
      {isLoading && spinnerPlacement === 'end' && spinner}
      {endContent}
    </AriaButton>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _Button = forwardRef(Button);
export { _Button as Button };

import type { ButtonVariantProps } from '@alice-ui/theme';
import { button } from '@alice-ui/theme';
import { filterDOMProps } from '@react-aria/utils';
import { ForwardedRef, createContext, forwardRef, useCallback, useMemo } from 'react';
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import {
  ContextValue,
  RenderProps,
  SlotProps,
  dataAttr,
  useContextProps,
  useRenderProps,
} from '../_util/utils';
import { Ripple, useRipple } from '../ripple';

export interface ButtonRenderProps {
  /**
   * Whether the button is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the button is currently in a pressed state.
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the button is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the button is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the button is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    SlotProps,
    RenderProps<ButtonRenderProps>,
    ButtonVariantProps {
  /**
   * The <form> element to associate the button with.
   * The value of this attribute must be the id of a <form> in the same document.
   */
  form?: string;
  /**
   * The URL that processes the information submitted by the button.
   * Overrides the action attribute of the button's form owner.
   */
  formAction?: string;
  /** Indicates how to encode the form data that is submitted. */
  formEncType?: string;
  /** Indicates the HTTP method used to submit the form. */
  formMethod?: string;
  /** Indicates that the form is not to be validated when it is submitted. */
  formNoValidate?: boolean;
  /** Overrides the target attribute of the button's form owner. */
  formTarget?: string;
  /** Submitted as a pair with the button's value as part of the form data. */
  name?: string;
  /** The value associated with the button's name when it's submitted with the form data. */
  value?: string;
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
}

interface ButtonContextValue extends ButtonProps {
  isPressed?: boolean;
}

const additionalButtonHTMLAttributes = new Set([
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'name',
  'value',
]);

export const ButtonContext = createContext<ContextValue<ButtonContextValue, HTMLButtonElement>>({});

function Button(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  [props, ref] = useContextProps(props, ref, ButtonContext);
  const ctx = props as ButtonContextValue;
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
    slot,
  } = ctx;

  const { onClick: onRippleClickHandler, ripples } = useRipple();
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disableRipple || isDisabled || disableAnimation) return;
      onRippleClickHandler(e);
    },
    [disableRipple, isDisabled, disableAnimation, onRippleClickHandler],
  );

  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing(props);
  const { hoverProps, isHovered } = useHover(props);
  const renderProps = useRenderProps({
    ...props,
    values: {
      isHovered,
      isPressed,
      isFocused,
      isFocusVisible,
      isDisabled: isDisabled || false,
    },
    defaultClassName: 'react-aria-Button',
  });

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
    <button
      {...filterDOMProps(props, { propNames: additionalButtonHTMLAttributes })}
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      {...renderProps}
      ref={ref}
      slot={slot}
      data-disabled={dataAttr(isDisabled)}
      data-pressed={ctx.isPressed || dataAttr(isPressed)}
      data-hovered={dataAttr(isHovered)}
      data-focused={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
      className={styles}
      onClick={handleClick}
    >
      {renderProps.children}
      {!disableRipple && <Ripple ripples={ripples} />}
    </button>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _Button = forwardRef(Button);
export { _Button as Button };

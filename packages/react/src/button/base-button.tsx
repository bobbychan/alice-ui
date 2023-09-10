import { filterDOMProps } from '@react-aria/utils';
import { ForwardedRef, createContext, forwardRef } from 'react';
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import {
  ContextValue,
  RenderProps,
  SlotProps,
  dataAttr,
  useContextProps,
  useRenderProps,
} from '../_util/utils';

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

export interface BaseButtonProps
  extends Omit<AriaButtonProps, 'children' | 'href' | 'target' | 'rel' | 'elementType'>,
    SlotProps,
    RenderProps<ButtonRenderProps> {
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonContextValue extends BaseButtonProps {
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

function BaseButton(props: BaseButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  [props, ref] = useContextProps(props, ref, ButtonContext);
  let ctx = props as ButtonContextValue;
  let { buttonProps, isPressed } = useButton(props, ref);
  let { focusProps, isFocused, isFocusVisible } = useFocusRing(props);
  let { hoverProps, isHovered } = useHover(props);
  let renderProps = useRenderProps({
    ...props,
    values: {
      isHovered,
      isPressed,
      isFocused,
      isFocusVisible,
      isDisabled: props.isDisabled || false,
    },
    defaultClassName: 'react-aria-Button',
  });

  return (
    <button
      {...filterDOMProps(props, { propNames: additionalButtonHTMLAttributes })}
      {...mergeProps(buttonProps, focusProps, hoverProps)}
      {...renderProps}
      ref={ref}
      slot={props.slot}
      data-disabled={dataAttr(props.isDisabled)}
      data-pressed={ctx.isPressed || dataAttr(isPressed)}
      data-hovered={dataAttr(isHovered)}
      data-focused={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
      onClick={props.onClick}
    />
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _BaseButton = forwardRef(BaseButton);
export { _BaseButton as BaseButton };

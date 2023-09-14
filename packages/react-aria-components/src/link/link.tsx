import { filterDOMProps, mergeRefs } from '@react-aria/utils';
import React, { ForwardedRef, createContext, forwardRef, useMemo } from 'react';
import { AriaLinkOptions, mergeProps, useFocusRing, useHover, useLink } from 'react-aria';
import {
  ContextValue,
  RenderProps,
  SlotProps,
  forwardRefType,
  useContextProps,
  useRenderProps,
} from '../_utils/utils';

export interface LinkProps
  extends Omit<AriaLinkOptions, 'elementType'>,
    RenderProps<LinkRenderProps>,
    SlotProps {
  'aria-current'?: string;
}

export interface LinkRenderProps {
  /**
   * Whether the link is the current item within a list.
   * @selector [data-current]
   */
  isCurrent: boolean;
  /**
   * Whether the link is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the link is currently in a pressed state.
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether the link is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the link is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the link is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export const LinkContext = createContext<ContextValue<LinkProps, HTMLAnchorElement>>(null);

function Link(props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) {
  [props, ref] = useContextProps(props, ref, LinkContext);

  let elementType =
    typeof props.children === 'string' || typeof props.children === 'function' ? 'span' : 'a';
  let { linkProps, isPressed } = useLink({ ...props, elementType }, ref);

  let { hoverProps, isHovered } = useHover(props);
  let { focusProps, isFocused, isFocusVisible } = useFocusRing();

  let renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-Link',
    values: {
      isCurrent: !!props['aria-current'],
      isDisabled: props.isDisabled || false,
      isPressed,
      isHovered,
      isFocused,
      isFocusVisible,
    },
  });

  let DOMProps = filterDOMProps(props);
  delete DOMProps.id;

  let element: any =
    typeof renderProps.children === 'string' ? (
      <span>{renderProps.children}</span>
    ) : (
      React.Children.only(renderProps.children)
    );

  return React.cloneElement(element, {
    ref: useMemo(() => (element.ref ? mergeRefs(element.ref, ref) : ref), [element.ref, ref]),
    slot: props.slot,
    ...mergeProps(
      DOMProps,
      renderProps,
      linkProps,
      hoverProps,
      focusProps,
      {
        children: element.props.children,
        'data-focused': isFocused || undefined,
        'data-hovered': isHovered || undefined,
        'data-pressed': isPressed || undefined,
        'data-focus-visible': isFocusVisible || undefined,
        'data-current': !!props['aria-current'] || undefined,
        'data-disabled': props.isDisabled || undefined,
      },
      element.props,
    ),
  });
}

/**
 * A link allows a user to navigate to another page or resource within a web page
 * or application.
 */
const _Link = (forwardRef as forwardRefType)(Link);
export { _Link as Link };

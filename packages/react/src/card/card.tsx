import { clsx, dataAttr } from '@alice-ui/shared-utils';
import {
  CardReturnType,
  CardSlots,
  CardVariantProps,
  SlotsToClasses,
  card,
  filterVariantProps,
} from '@alice-ui/theme';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import type { FocusableProps, PressEvents } from '@react-types/shared';
import {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useMemo,
} from 'react';
import { useButton, useFocusRing, useHover } from 'react-aria';
import { ContextValue, useContextProps } from 'react-aria-components';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  elementType?: string;
  /**
   * Usually the Card parts, `CardHeader`, `CardBody` and `CardFooter`.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Whether the card should allow text selection on press. (only for pressable cards)
   * @default true
   */
  allowTextSelectionOnPress?: boolean;
  /**
   * Classes object to style the card and its children.
   */
  classNames?: SlotsToClasses<CardSlots>;
}

export type CardProps = Props & PressEvents & FocusableProps & CardVariantProps;

export interface CardContextValue extends CardProps {
  slots: CardReturnType;
  classNames?: SlotsToClasses<CardSlots>;
  isDisabled?: CardVariantProps['isDisabled'];
  isFooterBlurred?: CardVariantProps['isFooterBlurred'];
  disableAnimation?: CardVariantProps['disableAnimation'];
  fullWidth?: CardVariantProps['fullWidth'];
  isPressable?: CardVariantProps['isPressable'];
}

export const CardContext = createContext<ContextValue<CardContextValue, HTMLDivElement>>({});

function Card(props: CardProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, CardContext);
  const ctx = props as CardContextValue;

  const { elementType, children, autoFocus, className, classNames, onPress, ...cardProps } = props;

  const variantProps = filterVariantProps(props, card.variantKeys);

  const Component = (elementType || (props.isPressable ? 'button' : 'div')) as ElementType;
  let componentProps = cardProps;
  if (typeof Component === 'string') {
    componentProps = filterDOMProps(cardProps);
  }

  const baseStyles = clsx(classNames?.base, className);

  const { buttonProps, isPressed } = useButton(
    {
      elementType: Component,
      onPress,
      isDisabled: !props.isPressable,
      ...cardProps,
    },
    ref,
  );
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus });
  const { hoverProps, isHovered } = useHover({
    isDisabled: !props.isHoverable,
    ...cardProps,
  });

  const slots = useMemo(
    () =>
      card({
        ...variantProps,
      }),
    [variantProps],
  );

  const context = useMemo<CardContextValue>(
    () => ({
      isPressable: ctx.isPressable,
      isDisabled: ctx.isDisabled,
      isFooterBlurred: ctx.isFooterBlurred,
      disableAnimation: ctx.disableAnimation,
      fullWidth: ctx.fullWidth,
      slots,
      classNames,
    }),
    [
      ctx.isPressable,
      ctx.isDisabled,
      ctx.isFooterBlurred,
      ctx.disableAnimation,
      ctx.fullWidth,
      slots,
      classNames,
    ],
  );

  return (
    <Component
      {...mergeProps(
        props.isPressable ? { ...buttonProps, ...focusProps, role: 'button' } : {},
        props.isHoverable ? hoverProps : {},
        componentProps,
      )}
      ref={ref}
      className={slots.base({ class: baseStyles })}
      tabIndex={props.isPressable ? 0 : -1}
      data-disabled={dataAttr(props.isDisabled)}
      data-pressed={dataAttr(isPressed)}
      data-hovered={dataAttr(isHovered)}
      data-focused={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
    >
      <CardContext.Provider value={context}>{children}</CardContext.Provider>
    </Component>
  );
}

const _Card = forwardRef(Card);
export { _Card as Card };

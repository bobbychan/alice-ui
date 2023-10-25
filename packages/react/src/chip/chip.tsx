import { XCircleFilledIcon } from '@alice-ui/icons';
import { clsx } from '@alice-ui/shared-utils';
import type { ChipSlots, ChipVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { chip, filterVariantProps } from '@alice-ui/theme';
import { filterDOMProps } from '@react-aria/utils';
import React, {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react';
import { PressEvent, mergeProps, useFocusRing, usePress } from 'react-aria';
import { ContextValue, useContextProps } from 'react-aria-components';

export interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, ChipVariantProps {
  elementType?: string;
  /**
   * Avatar to be rendered in the left side of the chip.
   */
  avatar?: React.ReactNode;
  /**
   * Element to be rendered in the left side of the chip.
   * this props overrides the `avatar` prop.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the chip.
   * if you pass this prop and the `onClose` prop, the passed element
   * will have the close button props and it will be rendered instead of the
   * default close button.
   */
  endContent?: React.ReactNode;
  /**
   * Classes object to style the chip and its children.
   */
  classNames?: SlotsToClasses<ChipSlots>;
  /**
   * Callback fired when the chip is closed. if you pass this prop,
   * the chip will display a close button (endContent).
   * @param e PressEvent
   */
  onClose?: (e: PressEvent) => void;
}

interface ChipContextValue extends ChipProps {
  isDisabled?: boolean;
}

export const ChipContext = createContext<ContextValue<ChipContextValue, HTMLDivElement>>({});

function Chip(props: ChipProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, ChipContext);

  const ctx = props as ChipContextValue;

  const {
    elementType,
    children,
    avatar,
    startContent: startContentProps,
    endContent: endContentProps,
    classNames,
    className,
    onClose,
    ...chipProps
  } = props;

  const variantProps = filterVariantProps(props, chip.variantKeys);

  const Component = (elementType || 'div') as ElementType;
  let componentProps = chipProps;
  if (typeof Component === 'string') {
    componentProps = filterDOMProps(chipProps);
  }

  const baseStyles = clsx(classNames?.base, className);
  const isCloseable = !!onClose;
  const isDot = props.variant === 'dot';

  const { focusProps: closeFocusProps, isFocusVisible: isCloseButtonFocusVisible } = useFocusRing();

  const { pressProps: closePressProps } = usePress({
    isDisabled: !!ctx?.isDisabled,
    onPress: onClose,
  });

  const hasStartContent = useMemo(
    () => !!avatar || !!startContentProps,
    [avatar, startContentProps],
  );
  const hasEndContent = useMemo(
    () => !!endContentProps || isCloseable,
    [endContentProps, isCloseable],
  );

  const slots = useMemo(
    () =>
      chip({
        ...variantProps,
        hasStartContent,
        hasEndContent,
        isCloseable,
        isCloseButtonFocusVisible,
      }),
    [variantProps, hasStartContent, hasEndContent, isCloseable, isCloseButtonFocusVisible],
  );

  const getAvatarClone = (avatar: ReactNode) => {
    if (!isValidElement(avatar)) return null;

    return cloneElement(avatar, {
      // @ts-ignore
      className: slots.avatar({ class: classNames?.avatar }),
    });
  };

  const getContentClone = (content: ReactNode) =>
    isValidElement(content)
      ? cloneElement(content, {
          // @ts-ignore
          className: clsx('max-h-[80%]', content.props.className),
        })
      : null;

  const startContent = getAvatarClone(avatar) || getContentClone(startContentProps);
  const endContent = getContentClone(endContentProps);

  const start = useMemo(() => {
    if (isDot && !startContent) {
      return <span className={slots.dot({ class: classNames?.dot })} />;
    }

    return startContent;
  }, [isDot, startContent, slots, classNames?.dot]);

  const end = useMemo(() => {
    if (isCloseable) {
      return (
        <span
          role="button"
          tabIndex={0}
          className={slots.closeButton({ class: classNames?.closeButton })}
          {...mergeProps(closePressProps, closeFocusProps)}
        >
          {endContent || <XCircleFilledIcon />}
        </span>
      );
    }

    return endContent;
  }, [classNames?.closeButton, closeFocusProps, closePressProps, endContent, isCloseable, slots]);

  return (
    <Component ref={ref} className={slots.base({ class: baseStyles })} {...componentProps}>
      {start}
      <span className={slots.content({ class: classNames?.content })}>{children}</span>
      {end}
    </Component>
  );
}

const _Chip = forwardRef(Chip);
export { _Chip as Chip };

'use client';

import { callAllHandlers, clsx } from '@alice-ui/shared-utils';
import { ForwardedRef, forwardRef, useContext } from 'react';
import { CloseButton, CloseButtonProps } from '../button';

import { InternalModalContext } from './modal';

export type ModalCloseButtonProps = CloseButtonProps;

function ModalCloseButton(props: ModalCloseButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, className, onPress, ...otherProps } = props;

  const { slots, classNames, state } = useContext(InternalModalContext);

  return (
    <CloseButton
      ref={ref}
      className={slots.closeButton({ class: clsx(classNames?.closeButton, className) })}
      onPress={callAllHandlers(onPress, () => state.close())}
      radius="full"
      variant="light"
      {...otherProps}
    >
      {children}
    </CloseButton>
  );
}

const _ModalCloseButton = forwardRef(ModalCloseButton);

export { _ModalCloseButton as ModalCloseButton };

'use client';

import { callAllHandlers, clsx } from '@alice-ui/shared-utils';
import { ForwardedRef, forwardRef, useContext } from 'react';
import { CloseButton, IconButtonProps } from '../button';

import { InternalModalContext } from './modal';

function ModalCloseButton(props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, className, onPress, ...otherProps } = props;

  const { slots, classNames, state } = useContext(InternalModalContext);

  return (
    <CloseButton
      ref={ref}
      className={slots.closeButton({ class: clsx(classNames?.closeButton, className) })}
      onPress={callAllHandlers(onPress, () => state.close())}
      radius="full"
      variant="light"
      size="sm"
      {...otherProps}
    >
      {children}
    </CloseButton>
  );
}

const _ModalCloseButton = forwardRef(ModalCloseButton);

export { _ModalCloseButton as ModalCloseButton };

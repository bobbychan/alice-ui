import { callAllHandlers, clsx } from '@alice-ui/shared-utils';
import { ForwardedRef, forwardRef, useContext } from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';
import { CloseButton, CloseButtonProps } from '../button';

import { InternalModalContext } from './modal';

function ModalCloseButton(props: CloseButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, className, onPress, ...otherProps } = props;
  const state = useContext(OverlayTriggerStateContext);
  const { slots, classNames } = useContext(InternalModalContext);

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

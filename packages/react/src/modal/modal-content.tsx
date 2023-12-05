'use client';

import { clsx } from '@alice-ui/shared-utils';
import { useContext } from 'react';
import { Dialog, DialogProps } from 'react-aria-components';
import { InternalModalContext } from './modal';

export interface ModalContentProps extends DialogProps {}

function ModalContent(props: ModalContentProps) {
  const { slots, classNames } = useContext(InternalModalContext);
  const { className, children, ...otherProps } = props;

  return (
    <Dialog
      className={slots.dialog({ class: clsx(classNames?.dialog, className) })}
      {...otherProps}
    >
      {children}
    </Dialog>
  );
}

export { ModalContent };

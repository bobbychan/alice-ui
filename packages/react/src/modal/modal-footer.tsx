'use client';

import { clsx } from '@alice-ui/shared-utils';
import { ForwardedRef, forwardRef, useContext } from 'react';

import { InternalModalContext } from './modal';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function ModalFooter(props: ModalFooterProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, className, ...otherProps } = props;

  const { slots, classNames } = useContext(InternalModalContext);

  return (
    <div
      ref={ref}
      className={slots.footer({ class: clsx(classNames?.footer, className) })}
      {...otherProps}
    >
      {children}
    </div>
  );
}

const _ModalFooter = forwardRef(ModalFooter);

export { _ModalFooter as ModalFooter };

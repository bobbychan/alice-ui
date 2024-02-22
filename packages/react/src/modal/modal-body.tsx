import { clsx } from '@alice-ui/shared-utils';
import { ForwardedRef, forwardRef, useContext } from 'react';

import { InternalModalContext } from './modal';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

function ModalBody(props: ModalBodyProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, className, ...otherProps } = props;

  const { slots, classNames } = useContext(InternalModalContext);

  return (
    <div
      ref={ref}
      className={slots.body({ class: clsx(classNames?.body, className) })}
      {...otherProps}
    >
      {children}
    </div>
  );
}

const _ModalBody = forwardRef(ModalBody);

export { _ModalBody as ModalBody };

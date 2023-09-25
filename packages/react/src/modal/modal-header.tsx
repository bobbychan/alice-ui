import { clsx } from '@alice-ui/shared-utils';
import { useContext } from 'react';
import { Heading, HeadingProps } from 'react-aria-components';

import { InternalModalContext } from './modal';

export interface ModalHeaderProps extends HeadingProps {
  elementType?: string;
}

function ModalHeader(props: ModalHeaderProps) {
  const { children, className, ...otherProps } = props;

  const { slots, classNames } = useContext(InternalModalContext);

  return (
    <Heading
      className={slots.header({ class: clsx(classNames?.header, className) })}
      {...otherProps}
    >
      {children}
    </Heading>
  );
}

export { ModalHeader };

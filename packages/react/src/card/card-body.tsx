import { clsx } from '@alice-ui/shared-utils';
import { ElementType, ForwardedRef, HTMLAttributes, forwardRef, useContext } from 'react';
import { CardContext, CardContextValue } from './card';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  elementType?: string;
}

function CardBody(props: CardBodyProps, ref: ForwardedRef<HTMLDivElement>) {
  const { elementType, className, ...otherProps } = props;

  const Component = (elementType || 'div') as ElementType;

  const { slots, classNames } = useContext(CardContext) as CardContextValue;

  const bodyStyles = clsx(classNames?.body, className);

  return <Component ref={ref} className={slots.body?.({ class: bodyStyles })} {...otherProps} />;
}

const _CardBody = forwardRef(CardBody);
export { _CardBody as CardBody };

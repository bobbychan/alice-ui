import { clsx } from '@alice-ui/shared-utils';
import { ElementType, ForwardedRef, HTMLAttributes, forwardRef, useContext } from 'react';
import { CardContext, CardContextValue } from './card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  elementType?: string;
}

function CardHeader(props: CardHeaderProps, ref: ForwardedRef<HTMLDivElement>) {
  const { elementType, className, ...otherProps } = props;

  const Component = (elementType || 'div') as ElementType;

  const { slots, classNames } = useContext(CardContext) as CardContextValue;

  const headerStyles = clsx(classNames?.header, className);

  return (
    <Component ref={ref} className={slots.header?.({ class: headerStyles })} {...otherProps} />
  );
}

const _CardHeader = forwardRef(CardHeader);
export { _CardHeader as CardHeader };

import { clsx } from '@alice-ui/shared-utils';
import { ElementType, ForwardedRef, HTMLAttributes, forwardRef, useContext } from 'react';
import { CardContext, CardContextValue } from './card';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  elementType?: string;
}

function CardFooter(props: CardFooterProps, ref: ForwardedRef<HTMLDivElement>) {
  const { elementType, className, ...otherProps } = props;

  const Component = (elementType || 'div') as ElementType;

  const { slots, classNames } = useContext(CardContext) as CardContextValue;

  const footerStyles = clsx(classNames?.footer, className);

  return (
    <Component ref={ref} className={slots.footer?.({ class: footerStyles })} {...otherProps} />
  );
}

const _CardFooter = forwardRef(CardFooter);
export { _CardFooter as CardFooter };

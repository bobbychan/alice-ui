import { ElementType, ForwardedRef, HTMLAttributes, createContext, forwardRef } from 'react';
import { ContextValue, useContextProps } from '../_utils/utils';

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  elementType?: string;
  level?: number;
}

export const HeadingContext = createContext<ContextValue<HeadingProps, HTMLHeadingElement>>({});

function Heading(props: HeadingProps, ref: ForwardedRef<HTMLHeadingElement>) {
  [props, ref] = useContextProps(props, ref, HeadingContext);
  const { children, level = 3, elementType, className, ...domProps } = props;

  const Component = (elementType || `h${level}`) as ElementType;

  return (
    <Component {...domProps} className={className ?? 'react-aria-Heading'}>
      {children}
    </Component>
  );
}

const _Heading = forwardRef(Heading);
export { _Heading as Heading };

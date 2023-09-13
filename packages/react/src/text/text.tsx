import { ElementType, ForwardedRef, HTMLAttributes, createContext, forwardRef } from 'react';
import { ContextValue, useContextProps } from '../_util/utils';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  elementType?: string;
}

export const TextContext = createContext<ContextValue<TextProps, HTMLElement>>({});

function Text(props: TextProps, ref: ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, TextContext);
  const { elementType, className, ...domProps } = props;

  const Component = (elementType || 'label') as ElementType;

  return <Component className={className} {...domProps} ref={ref} />;
}

const _Text = forwardRef(Text);
export { _Text as Text };

import { ElementType, ForwardedRef, LabelHTMLAttributes, createContext } from 'react';
import { ContextValue, createHideableComponent, useContextProps } from '../_util/utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  elementType?: string;
}

export const LabelContext = createContext<ContextValue<LabelProps, HTMLLabelElement>>({});

function Label(props: LabelProps, ref: ForwardedRef<HTMLLabelElement>) {
  [props, ref] = useContextProps(props, ref, LabelContext);
  const { elementType, className, ...labelProps } = props;

  const Component = (elementType || 'label') as ElementType;

  return <Component className={className} {...labelProps} ref={ref} />;
}

const _Label = createHideableComponent(Label);
export { _Label as Label };

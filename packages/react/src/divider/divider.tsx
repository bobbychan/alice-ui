import { ContextValue, useContextProps } from '@alice-ui/react-aria-components';
import { divider } from '@alice-ui/theme';
import {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  createContext,
  forwardRef,
  useMemo,
} from 'react';
import { SeparatorProps, useSeparator } from 'react-aria';

export interface DividerProps extends HTMLAttributes<HTMLHRElement>, SeparatorProps {
  elementType?: string;
}

export const DividerContext = createContext<ContextValue<DividerProps, HTMLHRElement>>({});

function Divider(props: DividerProps, ref: ForwardedRef<HTMLHRElement>) {
  [props, ref] = useContextProps(props, ref, DividerContext);
  let { elementType, className, orientation, ...otherProps } = props;

  let Component = (elementType || 'hr') as ElementType;

  if (Component === 'hr' && orientation === 'vertical') {
    Component = 'div';
  }

  const { separatorProps } = useSeparator({
    elementType: typeof Component === 'string' ? Component : 'hr',
    orientation,
  });

  const styles = useMemo(
    () =>
      divider({
        orientation,
        className,
      }),
    [orientation, className],
  );

  return (
    <Component
      className={styles}
      role="separator"
      data-orientation={orientation}
      {...separatorProps}
      {...otherProps}
      ref={ref}
    />
  );
}

const _Divider = forwardRef(Divider);
export { _Divider as Divider };

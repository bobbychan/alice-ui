import { filterDOMProps } from '@react-aria/utils';
import { ForwardedRef, ReactNode, createContext, forwardRef } from 'react';
import { AriaDialogProps, useDialog } from 'react-aria';
import {
  ContextValue,
  Provider,
  SlotProps,
  StyleProps,
  forwardRefType,
  useContextProps,
} from '../_util/utils';
import { ButtonContext } from '../button';
import { HeadingContext } from '../heading';

interface DialogRenderProps {
  close: () => void;
}

export interface DialogProps extends AriaDialogProps, StyleProps, SlotProps {
  children?: ReactNode | ((opts: DialogRenderProps) => ReactNode);
  onClose?: () => void;
}

export const DialogContext = createContext<ContextValue<DialogProps, HTMLElement>>(null);

function Dialog(props: DialogProps, ref: ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, DialogContext);
  const { dialogProps, titleProps } = useDialog(props, ref);

  let children = props.children;
  if (typeof children === 'function') {
    children = children({
      close: props.onClose || (() => {}),
    });
  }

  return (
    <section
      {...filterDOMProps(props)}
      {...dialogProps}
      ref={ref}
      slot={props.slot}
      style={props.style}
      className={props.className ?? 'react-aria-Dialog'}
    >
      <Provider
        values={[
          [ButtonContext, undefined],
          // TODO: clear context within dialog content?
          [HeadingContext, { ...titleProps, level: 2 }],
        ]}
      >
        {children}
      </Provider>
    </section>
  );
}

/**
 * A dialog is an overlay shown above other content in an application.
 */
const _Dialog = (forwardRef as forwardRefType)(Dialog);
export { _Dialog as Dialog };

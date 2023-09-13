import { ReactNode, useRef } from 'react';
import { useOverlayTrigger } from 'react-aria';
import { OverlayTriggerProps, useOverlayTriggerState } from 'react-stately';
import { Provider } from '../_util/utils';
import { ButtonContext } from '../button';
import { ModalContext } from '../modal';
import { PopoverContext } from '../popover';
import { DialogContext } from './dialog';

export interface DialogTriggerProps extends OverlayTriggerProps {
  children: ReactNode;
}

/**
 * A DialogTrigger opens a dialog when a trigger element is pressed.
 */
export function DialogTrigger(props: DialogTriggerProps) {
  let state = useOverlayTriggerState(props);

  let buttonRef = useRef<HTMLButtonElement>(null);
  let { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, buttonRef);

  return (
    <Provider
      values={[
        [ModalContext, { state }],
        [DialogContext, { ...overlayProps, onClose: state.close }],
        [ButtonContext, { ...triggerProps, isPressed: state.isOpen, ref: buttonRef }],
        [PopoverContext, { state, triggerRef: buttonRef }],
      ]}
    >
      {props.children}
    </Provider>
  );
}

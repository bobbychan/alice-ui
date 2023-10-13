/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { PressResponder } from '@react-aria/interactions';
import { filterDOMProps } from '@react-aria/utils';
import { ForwardedRef, ReactNode, createContext, forwardRef, useContext, useRef } from 'react';
import { AriaDialogProps, useDialog, useOverlayTrigger } from 'react-aria';
import {
  HeadingContext,
  OverlayTriggerStateContext,
  PopoverContext,
  Provider,
  useContextProps,
} from 'react-aria-components';
import { OverlayTriggerProps, useOverlayTriggerState } from 'react-stately';
import { ContextValue, SlotProps, StyleProps, forwardRefType } from '../_utils/utils';

export interface DialogTriggerProps extends OverlayTriggerProps {
  children: ReactNode;
}

interface DialogRenderProps {
  close: () => void;
}

export interface DialogProps extends AriaDialogProps, StyleProps, SlotProps {
  /** Children of the dialog. A function may be provided to access a function to close the dialog. */
  children?: ReactNode | ((opts: DialogRenderProps) => ReactNode);
}

export const DialogContext = createContext<ContextValue<DialogProps, HTMLElement>>(null);

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
        [OverlayTriggerStateContext, state],
        [DialogContext, overlayProps],
        [PopoverContext, { triggerRef: buttonRef }],
      ]}
    >
      <PressResponder {...triggerProps} ref={buttonRef} isPressed={state.isOpen}>
        {props.children}
      </PressResponder>
    </Provider>
  );
}

function Dialog(props: DialogProps, ref: ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, DialogContext);
  let { dialogProps, titleProps } = useDialog(props, ref);
  let state = useContext(OverlayTriggerStateContext);

  let children = props.children;
  if (typeof children === 'function') {
    children = children({
      close: state?.close || (() => {}),
    });
  }

  return (
    <section
      {...filterDOMProps(props)}
      {...dialogProps}
      ref={ref}
      slot={props.slot || undefined}
      style={props.style}
      className={props.className ?? 'react-aria-Dialog'}
    >
      <Provider
        values={[
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
const _Dialog = /*#__PURE__*/ (forwardRef as forwardRefType)(Dialog);
export { _Dialog as Dialog };

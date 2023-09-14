import { filterDOMProps, mergeProps, useObjectRef, useViewportSize } from '@react-aria/utils';
import { ForwardedRef, RefObject, forwardRef, useRef } from 'react';
import { Overlay, useIsSSR, useModalOverlay } from 'react-aria';
import { OverlayTriggerState, useOverlayTriggerState } from 'react-stately';
import {
  forwardRefType,
  useContextProps,
  useEnterAnimation,
  useExitAnimation,
  useRenderProps,
} from '../_utils/utils';
import { ModalOverlayProps } from './modal';
import { InternalModalContext, ModalContext, ModalContextValue } from './modal-content';

interface ModalOverlayInnerProps extends ModalOverlayProps {
  overlayRef: RefObject<HTMLDivElement>;
  modalRef: RefObject<HTMLDivElement>;
  state: OverlayTriggerState;
  isExiting: boolean;
}

function ModalOverlayWithForwardRef(props: ModalOverlayProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, ModalContext);
  const ctx = props as ModalContextValue;
  const localState = useOverlayTriggerState(props);
  const state =
    props.isOpen != null || props.defaultOpen != null || !ctx?.state ? localState : ctx.state;

  const objectRef = useObjectRef(ref);
  const modalRef = useRef<HTMLDivElement>(null);
  const isOverlayExiting = useExitAnimation(objectRef, state.isOpen);
  const isModalExiting = useExitAnimation(modalRef, state.isOpen);
  const isExiting = isOverlayExiting || isModalExiting;
  const isSSR = useIsSSR();

  if ((!state.isOpen && !isExiting) || isSSR) {
    return null;
  }

  return (
    <ModalOverlayInner
      {...props}
      state={state}
      isExiting={isExiting}
      overlayRef={objectRef}
      modalRef={modalRef}
    />
  );
}

function ModalOverlayInner(props: ModalOverlayInnerProps) {
  const modalRef = props.modalRef;
  const { state } = props;
  const { modalProps, underlayProps } = useModalOverlay(props, state, modalRef);

  const entering = useEnterAnimation(props.overlayRef);
  const renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-ModalOverlay',
    values: {
      isEntering: entering,
      isExiting: props.isExiting,
      state,
    },
  });

  const viewport = useViewportSize();
  const style = {
    ...renderProps.style,
    '--visual-viewport-height': viewport.height + 'px',
  };

  return (
    <Overlay isExiting={props.isExiting}>
      <div
        {...mergeProps(filterDOMProps(props as any), underlayProps)}
        {...renderProps}
        style={style}
        ref={props.overlayRef}
        data-entering={entering || undefined}
        data-exiting={props.isExiting || undefined}
      >
        <InternalModalContext.Provider
          value={{
            modalProps,
            modalRef,
            state,
            isExiting: props.isExiting,
            isDismissable: props.isDismissable,
          }}
        >
          {renderProps.children}
        </InternalModalContext.Provider>
      </div>
    </Overlay>
  );
}

/**
 * A ModalOverlay is a wrapper for a Modal which allows customizing the backdrop element.
 */
export const ModalOverlay = (forwardRef as forwardRefType)(ModalOverlayWithForwardRef);

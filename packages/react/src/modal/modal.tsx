import { DOMAttributes } from '@react-types/shared';
import { ForwardedRef, RefObject, createContext, forwardRef, useContext } from 'react';
import { AriaModalOverlayProps } from 'react-aria';
import { OverlayTriggerProps, OverlayTriggerState } from 'react-stately';
import { ContextValue, RenderProps, SlotProps, forwardRefType } from '../_util/utils';
import { ModalContent } from './modal-content';
import { ModalOverlay } from './modal-overlay';

export interface ModalOverlayProps
  extends AriaModalOverlayProps,
    OverlayTriggerProps,
    RenderProps<ModalRenderProps>,
    SlotProps {}

export interface ModalRenderProps {
  /**
   * Whether the modal is currently entering. Use this to apply animations.
   * @selector [data-entering]
   */
  isEntering: boolean;
  /**
   * Whether the modal is currently exiting. Use this to apply animations.
   * @selector [data-exiting]
   */
  isExiting: boolean;
  /**
   * State of the modal.
   */
  state: OverlayTriggerState;
}

export interface ModalContextValue extends ModalOverlayProps {
  state?: OverlayTriggerState;
}

interface InternalModalContextValue {
  modalProps: DOMAttributes;
  modalRef: RefObject<HTMLDivElement>;
  isExiting: boolean;
  isDismissable?: boolean;
  state: OverlayTriggerState;
}

export const ModalContext = createContext<ContextValue<ModalContextValue, HTMLDivElement>>(null);
export const InternalModalContext = createContext<InternalModalContextValue | null>(null);

function Modal(props: ModalOverlayProps, ref: ForwardedRef<HTMLDivElement>) {
  const ctx = useContext(InternalModalContext);

  if (ctx) {
    return (
      <ModalContent {...props} modalRef={ref}>
        {props.children}
      </ModalContent>
    );
  }

  const {
    isDismissable,
    isKeyboardDismissDisabled,
    isOpen,
    defaultOpen,
    onOpenChange,
    children,
    ...otherProps
  } = props;

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent {...otherProps} modalRef={ref}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
const _Modal = /*#__PURE__*/ (forwardRef as forwardRefType)(Modal);
export { _Modal as Modal };

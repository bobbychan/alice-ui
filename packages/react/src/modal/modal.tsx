import { clsx } from '@alice-ui/shared-utils';
import type {
  DrawerReturnType,
  ModalReturnType,
  ModalSlots,
  ModalVariantProps,
  SlotsToClasses,
} from '@alice-ui/theme';
import { modal } from '@alice-ui/theme';
import { ForwardedRef, createContext, forwardRef, useMemo } from 'react';
import type { ModalOverlayProps } from 'react-aria-components';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
// https://github.com/adobe/react-spectrum/issues/5720
import '@formatjs/intl-listformat/locale-data/en';
import '@formatjs/intl-listformat/polyfill';

export interface ModalProps extends ModalOverlayProps, ModalVariantProps {
  /**
   * Classes object to style the modal and its children.
   */
  classNames?: SlotsToClasses<ModalSlots>;
}

interface InternalModalContextValue {
  slots: ModalReturnType | DrawerReturnType;
  classNames?: SlotsToClasses<ModalSlots>;
  // state: ModalRenderProps['state'];
}

export const InternalModalContext = createContext<InternalModalContextValue>(
  {} as InternalModalContextValue,
);

function Modal(props: ModalProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    children,
    classNames,
    className,
    size,
    radius,
    placement,
    shadow,
    backdrop = 'opaque',
    scrollBehavior,
    ...otherProps
  } = props;

  const slots = useMemo(
    () => modal({ size, radius, placement, shadow, scrollBehavior, backdrop }),
    [backdrop, placement, radius, scrollBehavior, shadow, size],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <ModalOverlay {...otherProps} className={slots.backdrop({ class: classNames?.backdrop })}>
      <div className={slots.wrapper({ class: classNames?.wrapper })} data-placement={placement}>
        <InternalModalContext.Provider value={{ slots, classNames }}>
          <AriaModal ref={ref} className={slots.base({ class: baseStyles })}>
            {children}
          </AriaModal>
        </InternalModalContext.Provider>
      </div>
    </ModalOverlay>
  );
}

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
const _Modal = forwardRef(Modal);
export { _Modal as Modal };

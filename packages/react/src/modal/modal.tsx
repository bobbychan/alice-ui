'use client';

import { clsx } from '@alice-ui/shared-utils';
import type {
  DrawerReturnType,
  ModalReturnType,
  ModalSlots,
  ModalVariantProps,
  SlotsToClasses,
} from '@alice-ui/theme';
import { modal } from '@alice-ui/theme';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useMemo } from 'react';
import type { ModalOverlayProps, ModalRenderProps } from 'react-aria-components';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
import { scaleInOut } from './modal-transition';

export interface ModalProps extends ModalOverlayProps, ModalVariantProps {
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<'section'>;
  /**
   * Classes object to style the modal and its children.
   */
  classNames?: SlotsToClasses<ModalSlots>;
}

interface InternalModalContextValue {
  slots: ModalReturnType | DrawerReturnType;
  classNames?: SlotsToClasses<ModalSlots>;
  state: ModalRenderProps['state'];
}

export const InternalModalContext = createContext<InternalModalContextValue>(
  {} as InternalModalContextValue,
);

function Modal(props: ModalProps) {
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
    motionProps,
    ...otherProps
  } = props;

  const slots = useMemo(
    () => modal({ size, radius, placement, shadow, scrollBehavior, backdrop }),
    [backdrop, placement, radius, scrollBehavior, shadow, size],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <ModalOverlay {...otherProps} className={slots.backdrop({ class: classNames?.backdrop })}>
      {({ state }) => (
        <InternalModalContext.Provider value={{ slots, classNames, state }}>
          <AnimatePresence>
            {state.isOpen && (
              <motion.div
                className={slots.wrapper({ class: classNames?.wrapper })}
                data-placement={placement}
                animate="enter"
                exit="exit"
                initial="exit"
                variants={scaleInOut}
                {...motionProps}
              >
                <AriaModal className={slots.base({ class: baseStyles })}>{children}</AriaModal>
              </motion.div>
            )}
          </AnimatePresence>
        </InternalModalContext.Provider>
      )}
    </ModalOverlay>
  );
}

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
export { Modal };

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
import { ForwardedRef, createContext, forwardRef, useMemo } from 'react';
import type { ModalOverlayProps } from 'react-aria-components';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
import { fadeInOut, scaleInOut } from './modal-transition';

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
  // state: ModalRenderProps['state'];
}

export const InternalModalContext = createContext<InternalModalContextValue>(
  {} as InternalModalContextValue,
);

// Wrap React Aria modal components so they support framer-motion values.
// const MotionModal = motion(AriaModal);
const MotionModalOverlay = motion(ModalOverlay);

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
    motionProps,
    isOpen,
    ...otherProps
  } = props;

  const slots = useMemo(
    () => modal({ size, radius, placement, shadow, scrollBehavior, backdrop }),
    [backdrop, placement, radius, scrollBehavior, shadow, size],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionModalOverlay
          isOpen
          animate="enter"
          exit="exit"
          initial="exit"
          variants={fadeInOut}
          {...otherProps}
          className={slots.backdrop({ class: classNames?.backdrop })}
        >
          <motion.div
            className={slots.wrapper({ class: classNames?.wrapper })}
            data-placement={placement}
            animate="enter"
            exit="exit"
            initial="exit"
            variants={scaleInOut}
            {...motionProps}
          >
            <InternalModalContext.Provider value={{ slots, classNames }}>
              <AriaModal ref={ref} className={slots.base({ class: baseStyles })}>
                {children}
              </AriaModal>
            </InternalModalContext.Provider>
          </motion.div>
        </MotionModalOverlay>
      )}
    </AnimatePresence>
  );
}

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
const _Modal = forwardRef(Modal);
export { _Modal as Modal };

import { clsx } from '@alice-ui/shared-utils';
import type { ModalSlots, ModalVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { modal } from '@alice-ui/theme';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useMemo } from 'react';
import type { ModalOverlayProps } from 'react-aria-components';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
import { scaleInOut } from './modal-transition';

export interface ModalProps extends ModalOverlayProps, ModalVariantProps {
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<'section'>;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tooltip classNames={{
   *    backdrop:"backdrop-classes",
   *    base: "base-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ModalSlots>;
}

interface InternalModalContextValue {
  slots: ReturnType<typeof modal>;
  classNames?: SlotsToClasses<ModalSlots>;
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
    motionProps,
    ...otherProps
  } = props;

  const slots = useMemo(
    () => modal({ size, radius, placement, shadow, backdrop }),
    [backdrop, placement, radius, shadow, size],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <InternalModalContext.Provider value={{ slots, classNames }}>
      <ModalOverlay {...otherProps} className={slots.backdrop({ class: classNames?.backdrop })}>
        {({ state }) => (
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
        )}
      </ModalOverlay>
    </InternalModalContext.Provider>
  );
}

/**
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
export { Modal };

import { clsx } from '@alice-ui/shared-utils';
import type { DrawerSlots, DrawerVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { drawer } from '@alice-ui/theme';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import type { ModalOverlayProps } from 'react-aria-components';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
import { InternalModalContext } from '../modal/modal';
import { slideHorizontal, slideVertical } from './drawer-transition';

export interface DrawerProps extends ModalOverlayProps, DrawerVariantProps {
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<'section'>;
  /**
   * Classes object to style the modal and its children.
   */
  classNames?: SlotsToClasses<DrawerSlots>;
}

function Drawer(props: DrawerProps) {
  const {
    children,
    classNames,
    className,
    placement,
    backdrop = 'opaque',
    motionProps,
    ...otherProps
  } = props;

  const slots = useMemo(() => drawer({ placement, backdrop }), [backdrop, placement]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <ModalOverlay {...otherProps} className={slots.backdrop({ class: classNames?.backdrop })}>
      {({ state }) => (
        <InternalModalContext.Provider value={{ slots, classNames, state }}>
          <AnimatePresence>
            {state.isOpen && (
              <motion.div
                className={slots.base({ class: baseStyles })}
                data-placement={placement}
                animate="enter"
                exit="exit"
                initial="exit"
                variants={
                  placement === 'top' || placement === 'bottom' ? slideVertical : slideHorizontal
                }
                {...motionProps}
              >
                <AriaModal style={{ height: '100%' }}>{children}</AriaModal>
              </motion.div>
            )}
          </AnimatePresence>
        </InternalModalContext.Provider>
      )}
    </ModalOverlay>
  );
}

export { Drawer };

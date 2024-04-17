import { clsx } from '@alice-ui/shared-utils';
import type { DrawerSlots, DrawerVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { drawer } from '@alice-ui/theme';
import type { HTMLMotionProps } from 'framer-motion';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import type { ModalOverlayProps } from 'react-aria-components';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
import { InternalModalContext } from '../modal/modal';
import { fadeInOut, slideHorizontal, slideVertical } from './drawer-transition';

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

// Wrap React Aria modal components so they support framer-motion values.
// const MotionModal = motion(AriaModal);
const MotionModalOverlay = m(ModalOverlay);

function Drawer(props: DrawerProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    children,
    classNames,
    className,
    placement,
    backdrop = 'opaque',
    motionProps,
    isOpen,
    ...otherProps
  } = props;

  const slots = useMemo(() => drawer({ placement, backdrop }), [backdrop, placement]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <AnimatePresence>
      {isOpen && (
        <LazyMotion features={domAnimation}>
          <MotionModalOverlay
            isOpen
            animate="enter"
            exit="exit"
            initial="exit"
            variants={fadeInOut}
            {...otherProps}
            className={slots.backdrop({ class: classNames?.backdrop })}
          >
            <m.div
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
              <InternalModalContext.Provider value={{ slots, classNames }}>
                <AriaModal ref={ref} style={{ height: '100%' }}>
                  {children}
                </AriaModal>
              </InternalModalContext.Provider>
            </m.div>
          </MotionModalOverlay>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
}

const _Drawer = forwardRef(Drawer);
export { _Drawer as Drawer };

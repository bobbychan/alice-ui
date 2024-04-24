import { clsx } from '@alice-ui/shared-utils';
import type { DrawerSlots, DrawerVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { drawer } from '@alice-ui/theme';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import type { ModalOverlayProps } from 'react-aria-components';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
import { InternalModalContext } from '../modal/modal';

export interface DrawerProps extends ModalOverlayProps, DrawerVariantProps {
  /**
   * Classes object to style the modal and its children.
   */
  classNames?: SlotsToClasses<DrawerSlots>;
}

function Drawer(props: DrawerProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, classNames, className, placement, backdrop = 'opaque', ...otherProps } = props;

  const slots = useMemo(() => drawer({ placement, backdrop }), [backdrop, placement]);

  const baseStyles = clsx(classNames?.base, className);

  return (
    <ModalOverlay {...otherProps} className={slots.backdrop({ class: classNames?.backdrop })}>
      <InternalModalContext.Provider value={{ slots, classNames }}>
        <AriaModal
          ref={ref}
          className={slots.base({ class: baseStyles })}
          data-placement={placement}
        >
          {children}
        </AriaModal>
      </InternalModalContext.Provider>
    </ModalOverlay>
  );
}

const _Drawer = forwardRef(Drawer);
export { _Drawer as Drawer };

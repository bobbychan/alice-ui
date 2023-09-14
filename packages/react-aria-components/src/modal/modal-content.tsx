import { filterDOMProps, mergeProps, mergeRefs, useObjectRef } from '@react-aria/utils';
import { ForwardedRef, useContext, useMemo } from 'react';
import { DismissButton } from 'react-aria';
import { RenderProps, useEnterAnimation, useRenderProps } from '../_utils/utils';
import { InternalModalContext, ModalRenderProps } from './modal';

export interface ModalContentProps extends RenderProps<ModalRenderProps> {
  modalRef: ForwardedRef<HTMLDivElement>;
}

export function ModalContent(props: ModalContentProps) {
  const { modalProps, modalRef, isExiting, isDismissable, state } =
    useContext(InternalModalContext)!;
  const mergedRefs = useMemo(() => mergeRefs(props.modalRef, modalRef), [props.modalRef, modalRef]);

  const ref = useObjectRef(mergedRefs);
  const entering = useEnterAnimation(ref);
  const renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-Modal',
    values: {
      isEntering: entering,
      isExiting,
      state,
    },
  });

  return (
    <div
      {...mergeProps(filterDOMProps(props as any), modalProps)}
      {...renderProps}
      ref={ref}
      data-entering={entering || undefined}
      data-exiting={isExiting || undefined}
    >
      {isDismissable && <DismissButton onDismiss={state.close} />}
      {renderProps.children}
    </div>
  );
}

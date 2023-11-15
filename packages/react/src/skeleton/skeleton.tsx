import { clsx, dataAttr } from '@alice-ui/shared-utils';
import type { SkeletonSlots, SkeletonVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { skeleton } from '@alice-ui/theme';
import { ForwardedRef, HTMLAttributes, forwardRef, useMemo } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, SkeletonVariantProps {
  /**
   * If `true`, it'll render its children with a nice fade transition
   * @default false
   */
  isLoaded?: boolean;
  classNames?: SlotsToClasses<SkeletonSlots>;
}

function Skeleton(props: SkeletonProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    isLoaded = false,
    disableAnimation = false,
    className,
    classNames,
    variant,
    children,
    ...skeletonProps
  } = props;

  const slots = useMemo(
    () =>
      skeleton({
        variant,
        disableAnimation,
      }),
    [disableAnimation, variant],
  );

  const baseStyles = clsx(classNames?.base, className);

  return (
    <div
      {...skeletonProps}
      ref={ref}
      className={slots.base({ class: baseStyles })}
      data-loaded={dataAttr(isLoaded)}
    >
      <div className={slots.content({ class: classNames?.content })}>{children}</div>
    </div>
  );
}

const _Skeleton = forwardRef(Skeleton);

export { _Skeleton as Skeleton };

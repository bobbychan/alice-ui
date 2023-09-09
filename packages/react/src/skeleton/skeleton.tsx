import { dataAttr } from '@alice-ui/shared-utils';
import type { SkeletonVariantProps } from '@alice-ui/theme';
import { skeleton } from '@alice-ui/theme';
import { ForwardedRef, HTMLAttributes, forwardRef, useMemo } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, SkeletonVariantProps {
  /**
   * If `true`, it'll render its children with a nice fade transition
   * @default false
   */
  isLoaded?: boolean;
}

function Skeleton(props: SkeletonProps, ref: ForwardedRef<HTMLDivElement>) {
  const { isLoaded, className, variant, children, ...skeletonProps } = props;

  const styles = useMemo(
    () =>
      skeleton({
        variant,
        className,
      }),
    [className, variant],
  );

  return (
    <div {...skeletonProps} ref={ref} className={styles} data-loaded={dataAttr(isLoaded)}>
      <div className="opacity-0 transition-opacity !duration-300 group-data-[loaded=true]:opacity-100 motion-reduce:transition-none">
        {children}
      </div>
    </div>
  );
}

const _Skeleton = forwardRef(Skeleton);

export { _Skeleton as Skeleton };

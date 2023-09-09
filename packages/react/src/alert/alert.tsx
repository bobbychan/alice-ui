import type { AlertVariantProps } from '@alice-ui/theme';

import { alert } from '@alice-ui/theme';
import { ForwardedRef, forwardRef, useMemo } from 'react';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    AlertVariantProps {}

/**
 * Alert informs users about important events.
 */
function Alert(props: AlertProps, ref: ForwardedRef<HTMLDivElement>) {
  const { className, variant, color, radius, children, ...rest } = props;

  const styles = useMemo(
    () =>
      alert({
        variant,
        color,
        radius,
        className,
      }),
    [className, color, radius, variant],
  );

  return (
    <div role="alert" {...rest} ref={ref} className={styles}>
      {children}
    </div>
  );
}

const _Alert = forwardRef(Alert);

export { _Alert as Alert };

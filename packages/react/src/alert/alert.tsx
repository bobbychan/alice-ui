import type { AlertVariantProps } from '@luna-ui/theme';

import { alert } from '@luna-ui/theme';
import { forwardRef, useMemo } from 'react';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    AlertVariantProps {}

/**
 * Alert informs users about important events.
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
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
});

Alert.displayName = 'Alert';

export default Alert;

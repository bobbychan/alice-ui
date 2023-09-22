import type { LabelVariantProps } from '@alice-ui/theme';
import { label } from '@alice-ui/theme';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import type { LabelProps as AriaLabelProps } from 'react-aria-components';
import { Label as AriaLabel } from 'react-aria-components';

export interface LabelProps extends Omit<AriaLabelProps, 'color'>, LabelVariantProps {
  className?: string;
}

function Label(props: LabelProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { className, color, size, ...otherProps } = props;

  const styles = useMemo(
    () =>
      label({
        size,
        color,
        className,
      }),
    [className, color, size],
  );

  return <AriaLabel className={styles} {...otherProps} ref={ref} />;
}

const _Label = forwardRef(Label);
export { _Label as Label };

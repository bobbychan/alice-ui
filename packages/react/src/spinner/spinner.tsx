import type { SpinnerVariantProps } from '@alice-ui/theme';

import { spinner } from '@alice-ui/theme';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { Bars } from './spinners/bars';
import { Dots } from './spinners/dots';
import { Ring } from './spinners/ring';
import { Spin } from './spinners/spin';

const SPINNERS = {
  bars: Bars,
  dots: Dots,
  ring: Ring,
  spin: Spin,
};
const DEFAULT_SPINNER = 'spin';

export interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'display' | 'opacity' | 'color'>,
    SpinnerVariantProps {
  /**
   * Spinner appearance
   * @default ring
   */
  variant?: keyof typeof SPINNERS;
}

/**
 * Spinners provide a visual cue that an action is processing awaiting a course of change or a result.
 */
function Spinner(props: SpinnerProps, ref: ForwardedRef<SVGSVGElement>) {
  const { className, variant = DEFAULT_SPINNER, color, size, ...spinnerProps } = props;

  const defaultSpinner = variant in SPINNERS ? variant : DEFAULT_SPINNER;

  const SpinnerComponent = SPINNERS[defaultSpinner];

  const styles = useMemo(
    () =>
      spinner({
        color,
        size,
        className,
      }),
    [className, color, size],
  );

  return <SpinnerComponent role="presentation" className={styles} ref={ref} {...spinnerProps} />;
}

const _Spinner = forwardRef(Spinner);

export { _Spinner as Spinner };

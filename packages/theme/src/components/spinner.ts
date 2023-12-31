import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils/tv';

/**
 * Spinner component
 *
 * const styles = spinner({...})
 *
 * @example
 * <div className={styles()}>
 *   // spinner content
 * </div>
 */
const spinner = tv({
  base: 'relative',
  variants: {
    color: {
      current: 'text-current',
      default: 'text-default',
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
    size: {
      xs: 'w-4',
      sm: 'w-5',
      md: 'w-8',
      lg: 'w-10',
      xl: 'w-14',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

export type SpinnerVariantProps = VariantProps<typeof spinner>;

export { spinner };

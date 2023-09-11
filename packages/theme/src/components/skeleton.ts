import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils/tv';

/**
 * Skeleton component
 *
 * const styles = skeleton({...})
 *
 * @example
 * <div className={styles()}>
 *   // skeleton content
 * </div>
 */
const skeleton = tv({
  base: [
    'group',
    'relative',
    'overflow-hidden',
    'bg-content3 dark:bg-content2',
    '!duration-300',
    'transition-[background]',
    'data-[loaded=true]:bg-transparent',
  ],
  variants: {
    variant: {
      shimmer: [
        'before:opacity-100',
        'before:absolute',
        'before:inset-0',
        'before:-translate-x-full',
        'before:animate-[shimmer_2s_infinite]',
        'before:border-t',
        'before:border-content4/30',
        'before:bg-gradient-to-r',
        'before:from-transparent',
        'before:via-content4',
        'dark:before:via-default-700/10',
        'before:to-transparent',
        'before:!duration-300',
        'before:transition-opacity',
        'data-[loaded=true]:before:opacity-0',
        'data-[loaded=true]:before:animate-none',
      ],
      pulse: 'animate-pulse data-[loaded=true]:animate-none',
    },
  },
  defaultVariants: {
    variant: 'shimmer',
  },
});

export type SkeletonVariantProps = VariantProps<typeof skeleton>;

export { skeleton };

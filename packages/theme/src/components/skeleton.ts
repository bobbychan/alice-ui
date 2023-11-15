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
  slots: {
    base: [
      'group',
      'relative',
      'overflow-hidden',
      'bg-content3 dark:bg-content2',
      'data-[loaded=true]:bg-transparent',
    ],
    content: ['opacity-0', 'group-data-[loaded=true]:opacity-100'],
  },
  variants: {
    variant: {
      wave: {
        base: [
          'before:opacity-100',
          'before:absolute',
          'before:inset-0',
          'before:-translate-x-full',
          'before:animate-[wave_2s_infinite]',
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
      },
      pulse: {
        base: 'animate-pulse data-[loaded=true]:animate-none',
      },
    },

    disableAnimation: {
      true: {
        base: 'before:transition-none animate-none before:animate-none',
        content: 'transition-none',
      },
      false: {
        base: [
          'transition-[background]',
          '!duration-300',
          'before:transition-opacity',
          'before:!duration-300',
        ],
        content: ['transition-opacity', 'motion-reduce:transition-none', '!duration-300'],
      },
    },
  },
  defaultVariants: {
    variant: 'wave',
    disableAnimation: false,
  },
});

export type SkeletonVariantProps = VariantProps<typeof skeleton>;
export type SkeletonSlots = keyof ReturnType<typeof skeleton>;

export { skeleton };

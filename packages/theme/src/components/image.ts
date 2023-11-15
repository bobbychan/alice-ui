import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils/tv';

/**
 * Image wrapper **Tailwind Variants** component
 *
 * const {img, wrapper, blurredImg, zoomedWrapper} = image({...})
 *
 * @example
 * <div className={wrapper()}>
 *    <img alt="image" className={img())} src="https://..." />
 *      // wrap the image if you want to zoom it
 *      <div className={zoomedWrapper()}>
 *       <img alt="image" className={img())} src="https://..." />
 *     </div>
 *    // duplicate it for the blur effect
 *    <img alt="image" className={blurredImg())} src="https://..." />
 * </div>
 */
const image = tv({
  slots: {
    wrapper: 'relative shadow-black/5 shrink-0',
    zoomedWrapper: 'relative overflow-hidden rounded-inherit',
    img: 'relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 transition-transform-opacity motion-reduce:transition-none !duration-300',
  },
  variants: {
    radius: {
      none: {},
      sm: {},
      md: {},
      lg: {},
      full: {},
    },
    shadow: {
      none: {
        wrapper: 'shadow-none',
        img: 'shadow-none',
      },
      sm: {
        wrapper: 'shadow-small',
        img: 'shadow-small',
      },
      md: {
        wrapper: 'shadow-medium',
        img: 'shadow-medium',
      },
      lg: {
        wrapper: 'shadow-large',
        img: 'shadow-large',
      },
    },
    isZoomed: {
      true: {
        img: ['object-cover', 'transform', 'hover:scale-125'],
      },
    },
    showSkeleton: {
      true: {
        wrapper: [
          'group',
          'relative',
          'overflow-hidden',
          'bg-content3 dark:bg-content2',
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
        ],
        img: 'opacity-0',
      },
    },
  },
  defaultVariants: {
    radius: 'lg',
    shadow: 'none',
    isZoomed: false,
    showSkeleton: false,
  },
  compoundSlots: [
    {
      slots: ['wrapper', 'img', 'zoomedWrapper'],
      radius: 'none',
      class: 'rounded-none',
    },
    {
      slots: ['wrapper', 'img', 'zoomedWrapper'],
      radius: 'full',
      class: 'rounded-full',
    },
    {
      slots: ['wrapper', 'img', 'zoomedWrapper'],
      radius: 'sm',
      class: 'rounded-small',
    },
    {
      slots: ['wrapper', 'img', 'zoomedWrapper'],
      radius: 'md',
      class: 'rounded-md',
    },
    {
      slots: ['wrapper', 'img', 'zoomedWrapper'],
      radius: 'lg',
      class: 'rounded-large',
    },
  ],
});

export type ImageVariantProps = VariantProps<typeof image>;
export type ImageSlots = keyof ReturnType<typeof image>;

export { image };

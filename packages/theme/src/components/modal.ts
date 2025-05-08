import type { VariantProps } from 'tailwind-variants';

import { tv } from '../utils/tv';

/**
 * Modal **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, backdrop, header, body, footer} = modal({...})
 *
 * <div>
 *    <button>Open Modal</button>
 *    <div className={backdrop()}>
 *      <div className={base()}>
 *       <div className={header()}>Header</div>
 *       <div className={body()}>Body</div>
 *       <div className={footer()}>Footer</div>
 *      </div>
 *    </div>
 * </div>
 * ```
 */

const modal = tv({
  slots: {
    base: [
      'flex',
      'flex-col',
      'relative',
      'z-50',
      'w-full',
      'box-border',
      'bg-content1',
      'outline-none',
      'm-1',
      'sm:mx-6',
      'sm:my-16',
      '[--zoom-scale:0.9]',
      'data-[entering=true]:animate-[zoom_0.2s]',
      'data-[exiting=true]:animate-[zoom_0.2s_ease-in_reverse]',
    ],
    wrapper: [
      'flex',
      'w-screen',
      'h-[100dvh]',
      'fixed',
      'inset-0',
      'z-50',
      'overflow-x-auto',
      'justify-center',
    ],
    backdrop: ['z-50', 'fixed', 'inset-0', 'w-screen', 'h-dvh'],
    dialog: ['outline-none', 'flex', 'flex-col', 'overflow-hidden'],
    header: ['text-lg', 'font-semibold', 'py-4', 'px-6'],
    body: ['flex', 'flex-1', 'flex-col', 'gap-3', 'px-6', 'py-2'],
    footer: ['flex', 'flex-row', 'gap-2', 'justify-end', 'px-6', 'py-4'],
    closeButton: ['absolute', 'top-2', 'right-2', 'rtl:left-2', 'rtl:right-[unset]'],
  },
  variants: {
    size: {
      xs: {
        base: 'max-w-xs',
      },
      sm: {
        base: 'max-w-sm',
      },
      md: {
        base: 'max-w-md',
      },
      lg: {
        base: 'max-w-lg',
      },
      xl: {
        base: 'max-w-xl',
      },
      '2xl': {
        base: 'max-w-2xl',
      },
      '3xl': {
        base: 'max-w-3xl',
      },
      '4xl': {
        base: 'max-w-4xl',
      },
      '5xl': {
        base: 'max-w-5xl',
      },
      full: {
        base: 'm-0 sm:mx-0 sm:my-0 max-w-full h-[100dvh] !rounded-none',
      },
    },
    radius: {
      none: { base: 'rounded-none' },
      sm: { base: 'rounded-small' },
      md: { base: 'rounded-medium' },
      lg: { base: 'rounded-large' },
    },
    placement: {
      auto: {
        wrapper: 'items-end sm:items-center',
      },
      center: {
        wrapper: 'items-center sm:items-center',
      },
      top: {
        wrapper: 'items-start sm:items-start',
      },
      'top-center': {
        wrapper: 'items-start sm:items-center',
      },
      bottom: {
        wrapper: 'items-end sm:items-end',
      },
      'bottom-center': {
        wrapper: 'items-end sm:items-center',
      },
    },
    shadow: {
      sm: {
        base: 'shadow-small',
      },
      md: {
        base: 'shadow-medium',
      },
      lg: {
        base: 'shadow-large',
      },
    },
    backdrop: {
      transparent: {
        backdrop: 'bg-overlay/0',
      },
      opaque: {
        backdrop: [
          'bg-overlay/50',
          'backdrop-opacity-disabled',
          'data-[entering=true]:animate-[fade_0.3s]',
          'data-[exiting=true]:animate-[fade_0.2s_ease-in_reverse]',
        ],
      },
      blur: {
        backdrop: [
          'backdrop-blur-md',
          'backdrop-saturate-150',
          'bg-overlay/30',
          'data-[entering=true]:animate-[backdrop_0.3s]',
          'data-[exiting=true]:animate-[backdrop_0.2s_ease-in_reverse]',
        ],
      },
    },
    scrollBehavior: {
      normal: {
        base: 'overflow-y-hidden',
      },
      inside: {
        wrapper: 'overflow-y-hidden',
        base: 'max-h-[calc(100%_-_7.5rem)]',
        body: 'overflow-y-auto',
      },
      outside: {
        wrapper: 'items-start sm:items-start overflow-y-auto',
        base: 'my-16',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'lg',
    shadow: 'sm',
    placement: 'auto',
    backdrop: 'opaque',
    scrollBehavior: 'normal',
  },
});

export type ModalVariantProps = VariantProps<typeof modal>;
export type ModalSlots = keyof ReturnType<typeof modal>;
export type ModalReturnType = ReturnType<typeof modal>;

export { modal };

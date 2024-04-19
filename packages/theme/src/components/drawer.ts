import type { VariantProps } from 'tailwind-variants';

import { tv } from '../utils/tv';

/**
 * Drawer **Tailwind Variants** component
 *
 */

const drawer = tv({
  slots: {
    base: [
      'fixed',
      'z-50',
      'box-border',
      'bg-content1',
      'outline-none',
      'overflow-hidden',
      'shadow-[0_8px_10px_-5px_rgba(0,0,0,0.2),0_16px_24px_2px_rgba(0,0,0,0.14),0_6px_30px_5px_rgba(0,0,0,0.12)]',
      // top
      'data-[placement=top]:[--slide-enter:0%]',
      'data-[placement=top]:[--slide-exit:-100%]',
      // bottom
      'data-[placement=bottom]:[--slide-enter:0%]',
      'data-[placement=bottom]:[--slide-exit:100%]',
      // left
      'data-[placement=left]:[--slide-enter:0%]',
      'data-[placement=left]:[--slide-exit:-100%]',
      // right
      'data-[placement=right]:[--slide-enter:0%]',
      'data-[placement=right]:[--slide-exit:100%]',
    ],
    backdrop: ['z-50', 'fixed', 'inset-0', 'w-screen', 'h-screen'],
    dialog: ['outline-none', 'flex', 'flex-col', 'overflow-hidden', 'h-full', 'max-h-dvh'],
    header: ['text-lg', 'font-semibold', 'flex', 'py-4', 'px-6', 'flex-initial'],
    body: ['flex-1', 'px-6', 'py-2', 'overflow-y-auto'],
    footer: ['flex', 'flex-row', 'gap-2', 'justify-end', 'px-6', 'py-4'],
    closeButton: ['absolute', 'top-2', 'right-2', 'rtl:left-2', 'rtl:right-[unset]'],
  },
  variants: {
    placement: {
      top: {
        base: 'top-0 inset-x-0',
      },
      right: {
        base: 'top-0 right-0 bottom-0',
      },
      bottom: {
        base: 'bottom-0 inset-x-0',
      },
      left: {
        base: 'top-0 left-0 bottom-0',
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
  },
  defaultVariants: {
    placement: 'right',
    backdrop: 'opaque',
  },
});

export type DrawerVariantProps = VariantProps<typeof drawer>;
export type DrawerSlots = keyof ReturnType<typeof drawer>;
export type DrawerReturnType = ReturnType<typeof drawer>;

export { drawer };

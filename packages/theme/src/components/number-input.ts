import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils/tv';

/**
 * NumberInput wrapper **Tailwind Variants** component
 *
 * @example
 * <div className={numberInput()} />
 */
const numberInput = tv({
  slots: {
    base: '',
    label: ['text-sm', 'font-medium', 'text-foreground', 'pb-1.5', 'block'],
    wrapper: ['relative', 'group', 'flex', 'w-fit', 'gap-2.5', 'flex-row', 'items-center'],
    button: '',
    input: ['border-default-200', 'border-2', 'px-3'],
    description: 'flex flex-col gap-1.5 pt-1 px-1 text-xs text-foreground-400',
    errorMessage: 'flex flex-col gap-1.5 pt-1 px-1 text-xs text-danger',
  },
  variants: {
    isCompact: {
      true: {
        wrapper: ['gap-0'],
        button: [
          'data-[stepper=decrement]:rounded-e-none',
          'data-[stepper=increment]:rounded-s-none',
        ],
        input: ['rounded-none'],
      },
    },
  },
  defaultVariants: {},
});

export type NumberInputVariantProps = VariantProps<typeof numberInput>;
export type NumberInputSlots = keyof ReturnType<typeof numberInput>;

export { numberInput };

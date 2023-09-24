import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils/tv';

/**
 * TextField wrapper **Tailwind Variants** component
 *
 * @example
 * <div className={textField()} />
 */
const textField = tv({
  slots: {
    base: [
      'group',
      'flex',
      'flex-col',
      'data-[orientation=horizontal]:items-center',
      'data-[orientation=horizontal]:flex-row',
    ],
    label: [
      'text-sm',
      'font-medium',
      'text-foreground',
      'shrink-0',
      'group-data-[orientation=vertical]:pb-1.5',
      'group-data-[orientation=horizontal]:pr-2',
      "group-data-[required=true]:after:content-['*']",
      'group-data-[required=true]:after:text-danger',
      'group-data-[required=true]:after:ml-0.5',
    ],
    description: 'flex flex-col gap-1.5 pt-1 px-1 text-xs text-foreground-400',
    errorMessage: 'flex flex-col gap-1.5 pt-1 px-1 text-xs text-danger',
  },
  variants: {},
  defaultVariants: {},
});

export type TextFieldVariantProps = VariantProps<typeof textField>;
export type TextFieldSlots = keyof ReturnType<typeof textField>;

export { textField };

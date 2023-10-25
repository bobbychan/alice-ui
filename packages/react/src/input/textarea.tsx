import { XCircleFilledIcon } from '@alice-ui/icons';
import { clsx } from '@alice-ui/shared-utils';
import type { InputSlots, InputVariantProps, SlotsToClasses } from '@alice-ui/theme';
import { input } from '@alice-ui/theme';
import { ForwardedRef, TextareaHTMLAttributes, forwardRef, useMemo } from 'react';
import { mergeProps } from 'react-aria';
import { TextAreaContext, useContextProps } from 'react-aria-components';
import TextareaAutosize, { TextareaHeightChangeMeta } from 'react-textarea-autosize';
import { useInput } from './use-input';

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type TextareaAutoSizeStyle = Omit<
  NonNullable<NativeTextareaProps['style']>,
  'maxHeight' | 'minHeight'
> & {
  height?: number;
};

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'color' | 'size'>,
    InputVariantProps {
  /**
   * Minimum number of rows to show for textarea
   * @default 3
   */
  minRows?: number;
  /**
   * Maximum number of rows up to which the textarea can grow
   * @default 8
   */
  maxRows?: number;
  /**
   * Reuse previously computed measurements when computing height of textarea.
   * @default false
   */
  cacheMeasurements?: boolean;
  /**
   * Function invoked on textarea height change, with height as first argument.
   * The second function argument is an object containing additional information that
   * might be useful for custom behaviors. Current options include `{ rowHeight: number }`.
   *
   * @param height - The height of the textarea
   * @param meta - Additional information about the height change
   */
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
  /**
   * Classes object to style the textarea and its children.
   */
  classNames?: SlotsToClasses<InputSlots>;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  'data-value'?: string;
}

function TextArea(props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  [props, ref] = useContextProps(props, ref, TextAreaContext);

  const {
    classNames,
    className,
    color,
    size,
    radius,
    variant,
    fullWidth,
    isMultiline = true,
    style,
    minRows = 3,
    maxRows = 8,
    cacheMeasurements = false,
    onHeightChange,
    ...otherProps
  } = props;

  const { getInputWrapperProps, getInputProps, getClearButtonProps } = useInput({
    ...otherProps,
    ref,
  });

  const isClearable = !!props.onClear;

  const slots = useMemo(
    () => input({ color, size, radius, variant, fullWidth, isClearable, isMultiline }),
    [color, size, radius, variant, fullWidth, isClearable, isMultiline],
  );

  const baseStyles = clsx(classNames?.base, className);

  const clearButton = useMemo(
    () =>
      isClearable ? (
        <span
          {...getClearButtonProps()}
          className={slots.clearButton({ class: classNames?.clearButton })}
        >
          {<XCircleFilledIcon />}
        </span>
      ) : null,
    [classNames?.clearButton, getClearButtonProps, isClearable, slots],
  );

  const inputProps = getInputProps();

  return (
    <div className={slots.base({ class: baseStyles })} {...getInputWrapperProps()}>
      <TextareaAutosize
        {...inputProps}
        className={slots.input({ class: classNames?.input })}
        cacheMeasurements={cacheMeasurements}
        maxRows={maxRows}
        minRows={minRows}
        style={mergeProps(inputProps.style as TextareaAutoSizeStyle, style ?? {})}
        onHeightChange={onHeightChange}
      />
      {clearButton}
    </div>
  );
}
/**
 * A textarea allows a user to input mult-line text.
 */
const _TextArea = forwardRef(TextArea);
export { _TextArea as TextArea };

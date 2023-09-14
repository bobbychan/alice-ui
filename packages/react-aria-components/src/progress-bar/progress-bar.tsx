import { ForwardedRef, createContext, forwardRef } from 'react';
import { AriaProgressBarProps, useProgressBar } from 'react-aria';
import {
  ContextValue,
  RenderProps,
  SlotProps,
  useContextProps,
  useRenderProps,
  useSlot,
} from '../_utils/utils';
import { LabelContext } from '../label';

export interface ProgressBarProps
  extends Omit<AriaProgressBarProps, 'label'>,
    RenderProps<ProgressBarRenderProps>,
    SlotProps {}

export interface ProgressBarRenderProps {
  /**
   * The value as a percentage between the minimum and maximum.
   */
  percentage?: number;
  /**
   * A formatted version of the value.
   * @selector [aria-valuetext]
   */
  valueText: string | undefined;
  /**
   * Whether the progress bar is indeterminate.
   * @selector :not([aria-valuenow])
   */
  isIndeterminate: boolean;
}

export const ProgressBarContext =
  createContext<ContextValue<ProgressBarProps, HTMLDivElement>>(null);

function ProgressBar(props: ProgressBarProps, ref: ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, ProgressBarContext);
  let { value = 0, minValue = 0, maxValue = 100, isIndeterminate = false } = props;

  let [labelRef, label] = useSlot();
  let { progressBarProps, labelProps } = useProgressBar({ ...props, label });

  // Calculate the width of the progress bar as a percentage
  let percentage = isIndeterminate ? undefined : ((value - minValue) / (maxValue - minValue)) * 100;

  let renderProps = useRenderProps({
    ...props,
    defaultClassName: 'react-aria-ProgressBar',
    values: {
      percentage,
      valueText: progressBarProps['aria-valuetext'],
      isIndeterminate,
    },
  });

  return (
    <div {...progressBarProps} {...renderProps} ref={ref} slot={props.slot}>
      <LabelContext.Provider value={{ ...labelProps, ref: labelRef, elementType: 'span' }}>
        {renderProps.children}
      </LabelContext.Provider>
    </div>
  );
}

/**
 * Progress bars show either determinate or indeterminate progress of an operation
 * over time.
 */
const _ProgressBar = forwardRef(ProgressBar);
export { _ProgressBar as ProgressBar };

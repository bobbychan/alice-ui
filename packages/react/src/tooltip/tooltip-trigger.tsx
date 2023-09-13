import { FocusableProvider } from '@react-aria/focus';
import { FocusableElement } from '@react-types/shared';
import { ReactNode, useRef } from 'react';
import { useTooltipTrigger } from 'react-aria';
import { TooltipTriggerProps, useTooltipTriggerState } from 'react-stately';
import { InternalTooltipContext } from './tooltip';

export interface TooltipTriggerComponentProps extends TooltipTriggerProps {
  children: ReactNode;
}

/**
 * TooltipTrigger wraps around a trigger element and a Tooltip. It handles opening and closing
 * the Tooltip when the user hovers over or focuses the trigger, and positioning the Tooltip
 * relative to the trigger.
 */
export function TooltipTrigger(props: TooltipTriggerComponentProps) {
  let state = useTooltipTriggerState(props);
  let ref = useRef<FocusableElement>(null);
  let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <InternalTooltipContext.Provider value={{ state, triggerRef: ref, tooltipProps }}>
      <FocusableProvider {...triggerProps} ref={ref}>
        {props.children}
      </FocusableProvider>
    </InternalTooltipContext.Provider>
  );
}

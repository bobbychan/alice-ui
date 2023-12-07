'use client';

import { XMarkIcon } from '@alice-ui/icons';
import { ForwardedRef, forwardRef } from 'react';
import { IconButton, IconButtonProps } from './icon-button';

export interface CloseButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  'aria-label'?: string;
}

function CloseButton(props: CloseButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { children = <XMarkIcon />, ...otherProps } = props;

  const ariaLabel = props['aria-label'] || 'Close';

  return (
    <IconButton ref={ref} {...otherProps} aria-label={ariaLabel}>
      {children}
    </IconButton>
  );
}

/**
 * A button allows a user to perform an action, with mouse, touch, and keyboard interactions.
 */
const _CloseButton = forwardRef(CloseButton);
export { _CloseButton as CloseButton };

import {
  CheckCircleFilledIcon,
  CheckCircleIcon,
  ExclamationCircleFilledIcon,
  ExclamationCircleIcon,
  InfoFilledIcon,
  InfoIcon,
  XCircleFilledIcon,
  XCircleIcon,
} from '@alice-ui/icons';
import { clsx } from '@alice-ui/shared-utils';

export interface AlertIconProps extends Omit<React.HTMLAttributes<SVGSVGElement>, 'color'> {
  type?: 'info' | 'success' | 'warning' | 'error';
  filled?: boolean;
}

const ICONS = {
  info: { outline: InfoIcon, filled: InfoFilledIcon },
  warning: { outline: ExclamationCircleIcon, filled: ExclamationCircleFilledIcon },
  success: { outline: CheckCircleIcon, filled: CheckCircleFilledIcon },
  error: { outline: XCircleIcon, filled: XCircleFilledIcon },
};

const AlertIcon = (props: AlertIconProps) => {
  const { type = 'info', filled = false, className, ...rest } = props;

  const Icon = filled ? ICONS[type].filled : ICONS[type].outline;

  return <Icon className={clsx('h-6 w-6 shrink-0', className)} {...rest} />;
};

export { AlertIcon };

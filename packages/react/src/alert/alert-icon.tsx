import {
  CheckCircleFilledIcon,
  CheckCircleIcon,
  CloseCircleFilledIcon,
  CloseCircleIcon,
  ExclamationCircleFilledIcon,
  ExclamationCircleIcon,
  InfoFilledIcon,
  InfoIcon,
} from '@luna-ui/icons';
import { cx } from '@luna-ui/theme';

export interface AlertIconProps extends Omit<React.HTMLAttributes<SVGSVGElement>, 'color'> {
  type?: 'info' | 'success' | 'warning' | 'error';
  filled?: boolean;
}

const ICONS = {
  info: { outline: InfoIcon, solid: InfoFilledIcon },
  warning: { outline: ExclamationCircleIcon, solid: ExclamationCircleFilledIcon },
  success: { outline: CheckCircleIcon, solid: CheckCircleFilledIcon },
  error: { outline: CloseCircleIcon, solid: CloseCircleFilledIcon },
};

const AlertIcon = (props: AlertIconProps) => {
  const { type = 'info', filled = false, className, ...rest } = props;

  const Icon = filled ? ICONS[type].solid : ICONS[type].outline;

  return <Icon className={cx('shrink-0 w-6 h-6', className)} {...rest} />;
};

export default AlertIcon;

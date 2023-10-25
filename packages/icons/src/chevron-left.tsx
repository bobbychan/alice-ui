import { IconProps } from './types';

export const ChevronLeftIcon = ({ strokeWidth = 1.5, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

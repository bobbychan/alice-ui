import { IconProps } from './types';

export const ChevronLeftIcon = ({ strokeWidth = 1.5, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

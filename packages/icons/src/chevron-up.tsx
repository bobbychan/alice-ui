import { IconProps } from './types';

export const ChevronUpIcon = ({ strokeWidth = 1.5, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

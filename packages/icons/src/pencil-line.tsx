import { IconProps } from './types';

export const PencilLineIcon = ({ strokeWidth = 1.5, ...props }: IconProps) => (
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
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    <path d="m15 5 3 3" />
  </svg>
);

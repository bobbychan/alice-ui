import { IconProps } from './types';

export const UserIcon = (props: IconProps) => (
  <svg
    fill="currentColor"
    viewBox="0 0 1024 1024"
    strokeWidth={1.5}
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M512 464c88 0 160-72 160-160s-72-160-160-160-160 72-160 160 72 160 160 160z m-139.2 16C321.6 438.4 288 376 288 304c0-123.2 100.8-224 224-224s224 100.8 224 224c0 70.4-33.6 134.4-84.8 176C811.2 526.4 928 673.6 928 848c0 52.8-43.2 96-96 96H192c-52.8 0-96-43.2-96-96 0-174.4 116.8-321.6 276.8-368zM832 880c17.6 0 32-14.4 32-32 0-176-144-320-320-320h-64c-176 0-320 144-320 320 0 17.6 14.4 32 32 32h640z"></path>
  </svg>
);

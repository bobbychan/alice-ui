import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type { ClassValue };

export { clsx, twMerge };

export function cn<T>(className?: string | ((values: T) => string), ...inputs: ClassValue[]) {
  return typeof className === 'function'
    ? (val: T) => clsx(...inputs, className(val))
    : clsx(...inputs, className);
}

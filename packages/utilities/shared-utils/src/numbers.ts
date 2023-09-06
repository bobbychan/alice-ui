function toNumber(value: any) {
  const num = parseFloat(value);
  return typeof num !== 'number' || Number.isNaN(num) ? 0 : num;
}

/**
 * Converts a value to a specific precision (or decimal points).
 *
 * Returns a string representing a number in fixed-point notation.
 *
 * @param value the value to convert
 * @param precision the precision or decimal points
 */
export function toPrecision(value: number, precision?: number) {
  let nextValue: string | number = toNumber(value);
  const scaleFactor = 10 ** (precision ?? 10);
  nextValue = Math.round(nextValue * scaleFactor) / scaleFactor;
  return precision ? nextValue.toFixed(precision) : nextValue.toString();
}

/**
 * Counts the number of decimal places a number has
 *
 * @param value the decimal value to count
 */
export function countDecimalPlaces(value: number) {
  if (!Number.isFinite(value)) return 0;

  let e = 1;
  let p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p += 1;
  }
  return p;
}

/**
 * Clamps a value to ensure it stays within the min and max range.
 *
 * @param value the value to clamp
 * @param min the minimum value
 * @param max the maximum value
 */
export function clampValue(value: number, min: number, max: number) {
  if (value == null) return value;

  if (max < min) {
    console.warn('clamp: max cannot be less than min');
  }

  return Math.min(Math.max(value, min), max);
}

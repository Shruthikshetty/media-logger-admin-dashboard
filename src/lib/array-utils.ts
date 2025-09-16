/**
 * Returns an array of numbers from `start` to `end` (inclusive)
 * Example: arrayRange(1, 5) => [1, 2, 3, 4, 5]
 * @param start The starting number of the range (inclusive)
 * @param end The ending number of the range (inclusive)
 * @returns An array of numbers from `start` to `end` (inclusive)
 */
export const arrayRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

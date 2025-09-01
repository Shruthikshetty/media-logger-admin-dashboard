/**
 * function to return random hsl colors
 * @returns {string} hsl color
 */
export const getRandomColor = (options?: {
  saturation: number;
  lightness: number;
}): string => {
  //get random hue
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, ${options?.saturation ?? 75}%, ${options?.lightness ?? 65}%)`;
};

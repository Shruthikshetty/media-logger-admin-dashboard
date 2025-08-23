/**
 * Given the amount of XP, returns an object with the level and the Tailwindcss class for the level color
 * @param {number} xp - The amount of XP
 * @returns {object} - An object with the level (string) and the color (string)
 * @example
 * getXPLevel(1000) // returns { level: "Intermediate", color: "text-green-600" }
 */
export const getXPLevel = (xp: number) => {
  if (xp >= 15000) return { level: 'Master', color: 'text-purple-600' };
  if (xp >= 10000) return { level: 'Expert', color: 'text-yellow-600' };
  if (xp >= 5000) return { level: 'Advanced', color: 'text-blue-600' };
  if (xp >= 1000) return { level: 'Intermediate', color: 'text-green-600' };
  return { level: 'Beginner', color: 'text-ui-400' };
};

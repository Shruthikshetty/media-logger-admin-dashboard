import moment from 'moment';
/**
 * Checks if the user is active, given the last login date.
 * A user is considered active if they have logged in within the last 2 days.
 * @param {string | null | undefined} lastLogin - The last login date of the user.
 * @returns {boolean} - Whether the user is active or not.
 */
export const isUserActive = (lastLogin: string | null | undefined): boolean => {
  if (!lastLogin) return false;
  return moment(lastLogin).isSameOrAfter(moment().subtract(2, 'days'));
};

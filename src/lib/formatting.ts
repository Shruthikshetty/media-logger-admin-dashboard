//capitalize the first letter and rest to small
export function capitalizeFirstLetter(string: string) {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : '';
}

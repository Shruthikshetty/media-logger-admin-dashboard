//capitalize the first letter and rest to small
export function capitalizeFirstLetter(string: string) {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : '';
}

//format number indian style
export function formatToIndianNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

//format name each word to capitalize
export function formatName(name: string) {
  //if no name return empty
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
}
//capitalize the first letter and rest to small
export function capitalizeFirstLetter(string: string) {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : '';
}

// format number in Indian style (3-2-2 grouping). Uses Intl first, falls back to regex.
export function formatToIndianNumber(num: number) {
  if (!num) return '-';
  try {
    return new Intl.NumberFormat('en-IN', { useGrouping: true }).format(num);
  } catch {
    const [intPart, decPart] = String(num).split('.');
    const sign = intPart.startsWith('-') ? '-' : '';
    const digits = sign ? intPart.slice(1) : intPart;
    const lastThree = digits.slice(-3);
    const others = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    const formatted = (others ? others + ',' : '') + lastThree;
    return sign + (decPart ? `${formatted}.${decPart}` : formatted);
  }
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

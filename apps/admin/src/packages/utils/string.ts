export const convertToString = (value: any, isHTML: boolean): string => {
  value = typeof value === 'string' ? value : value !== undefined ? JSON.stringify(value) : value;

  if (isHTML && value !== undefined) {
    const tempEl = document.createElement('div')
    tempEl.innerHTML = value
    value = tempEl.textContent || tempEl.innerText
  }

  return value;
}
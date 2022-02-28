export function generateMMDDYY(date: Date): string {
  const format = "mm/dd/yy"
  const map: { [key: string]: any } = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString(),
    yyyy: date.getFullYear()
  }

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => {
    return map[matched] < 10 ? "0" + map[matched] : map[matched]
  })
}

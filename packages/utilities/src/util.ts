export const onlyUnique = (value: any, index: any, self: any): any => {
  return self.indexOf(value) === index
}

export const putSpaceBetweenCapitalLetters = (word: string): string => word.replace(/([A-Z])/g, " $1").trim()

export const removeSpaceBetweenCapitalLetters = (word: string): string => {
  const temp: string = word
    .trim()
    .split(" ")
    .map((x: string) => {
      const [x1, ...xrest] = x
      const x11 = x1.toUpperCase()
      return `${x11}${xrest.join("")}`
    })
    .join("")
  return temp
}

export const convertAmountToCSV = (value: any) => {
  const _value = isNaN(parseFloat(value)) ? (0).toFixed(2) : parseFloat(value).toFixed(2)
  return `$ ${_value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const convertCSVAmountToNumber = (text: any) => {
  return text !== undefined && typeof text === "string" ? text.replace(/\$\s?|(,*)/g, "") : ""
}

export const printArrayStringWithComma = ({ collection, propName = "", seperator = "," }: { collection: any[]; propName?: string; seperator?: string }): string => {
  let csvString = ""
  collection = collection.filter((x) => Boolean(x))
  collection.forEach((x, i) => {
    let value = ""
    if (x[propName]) value = x[propName]
    else value = x
    csvString += i === collection.length - 1 ? value : value + seperator + " "
  })
  return csvString
}

export const transformToLabel = (value: string | number): string | number => {
  if (typeof value === "number") return value
  return value.replace(/\w/, (str) => str.toUpperCase()).replace(/\W/g, " ")
}

export const getLocaleDecimalValue = (val?: number, digit = 2, locale?: Intl.LocalesArgument) => {
  if (typeof val !== "number") return val
  return val.toLocaleString(locale, {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit
  })
}

export const extractObjectValue = (obj: Record<string, any>, key: string) => {
  return key.split(".").reduce((a, c) => a[c], obj)
}

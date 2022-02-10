// const compose = (...fns: Array<(query: string) => any>) => (x: any) => fns.reduceRight((acc, fn) => fn(acc), x)
// const fromPairs = (x: any) =>
//   x.reduce((y: any, z: any) => {
//     y[z[0]] = z[1]
//     return y
//   }, {})
// const map = (x: any) => (y: any) => y.map(x)
// const split = (x: any) => (y: any) => y.split(x)
// const tail = (x: any) => x.slice(1)

// const splitOnEquals = map(split("="))
// const splitOnAmpersand = split("&")
// const removeQuestionMark = tail

const convertToType = (value: any) => {
  if (!isNaN(Number(value))) {
    return Number(value)
  } else if (value === "true") {
    return true
  } else if (value === "false") {
    return false
  } else if (value === "undefined") {
    return undefined
  } else if (value === "null") {
    return null
  }
  return value
}
export const querystringToObject = (): { [key: string]: any } => {
  const output: { [key: string]: any } = {}
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  const pairs: { [key: string]: string } = {}
  for (const pair of urlParams.entries()) {
    pairs[pair[0]] = pair[1]
  }

  for (const key of Object.keys(pairs)) {
    const value = pairs[key]
    if (value && typeof value === "string" && key.includes("[") && key.includes("]")) {
      const _key = key.slice(0, key.indexOf("["))

      const similarKeys = Object.keys(pairs).filter((x) => {
        const result = new RegExp(_key).test(x)
        return result
      })
      if (similarKeys.length > 0) {
        output[_key] = similarKeys.map((x) => convertToType(pairs[x]))
      }
    } else {
      output[key] = convertToType(value)
    }
  }
  return output
}

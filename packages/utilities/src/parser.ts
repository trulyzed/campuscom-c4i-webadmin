import htmlReactParser, { HTMLReactParserOptions } from "html-react-parser"

export const parseJSON = (data: any) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const parseReactElement = (html: string, options?: HTMLReactParserOptions) => {
  return htmlReactParser(html, options)
}

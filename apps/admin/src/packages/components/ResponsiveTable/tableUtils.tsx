import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { ReadOutlined } from "@ant-design/icons"
import { setScrollPosition } from "~/packages/components/ResponsiveTable//ManageScroll"
import { convertAmountToCSV } from "@packages/utilities/lib/util"

export const DATE_FORMAT = "MM/DD/YYYY"
export const TIME_FORMAT = "hh:mm A"
export const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A"
const renderDetailsLink = (url: string): JSX.Element => {
  return (
    <Link aria-label={`Go to  ${url}`} id={url} onClick={() => setScrollPosition(url)} to={url}>
      <ReadOutlined />
    </Link>
  )
}
const renderLink = (url: string, text: string, isModal?: boolean, isExternal?: boolean) =>
  text ? (
    isExternal ?
      <a href={url} target={"_blank"} rel={"noreferrer noopener"}>{text}</a>
      : !isModal ? (
        <Link id={url} onClick={() => setScrollPosition(url)} to={url}>
          {text}
        </Link>
      ) : (
        <span>{`${text}`}</span>
      )
  ) : null
const renderDecimal = (text: any) => (typeof text === "number" && !isNaN(Number(text)) ? Number(text).toFixed(2) : text)
const renderEmail = (text: any) => (!!text ? <a href={`mailto:${text}`}>{text}</a> : "")
const renderDate = (text: any) => (!!text ? moment(text).format(DATE_FORMAT) : "")
const renderDateTime = (text: any) => (!!text ? moment(text).format(DATE_TIME_FORMAT) : "")
const renderTime = (text: any) => (!!text ? moment(text).format(TIME_FORMAT) : "")
const renderAmount = (text: any) => (!!text ? <div style={{ textAlign: "right" }}>{convertAmountToCSV(text)}</div> : "")

const renderBoolean = (text: any) => {
  if (typeof text === "boolean") {
    return text ? "Yes" : "No"
  } else return ""
}

const renderWeek = (text: any[]) => {
  const weeks: string[] = ["Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return text && Array.isArray(text) && weeks.filter((x, i) => text.includes(i + 1))
}

const renderThumb = (url: string, alt?: string) => {
  if (!url) return undefined
  return <a className="external-link" target={"_blank"} rel={"noopener noreferrer"} href={url}><img className="thumb" src={url} alt={alt || url} /></a>
}

const sortByBoolean = (a: boolean, b: boolean) => (a === b ? 0 : a ? -1 : 1)
const sortByString = (a: string, b: string) => a.localeCompare(b)
const sortByTime = (a?: string, b?: string) => {
  const aa = a ? new Date(a).getTime() : 0
  const bb = b ? new Date(b).getTime() : 0

  return sortByNumber(aa, bb)
}
const sortByNumber = (a?: number, b?: number) => {
  return (a || 0) > (b || 0) ? -1 : 1
}

export {
  renderDetailsLink,
  renderLink,
  renderDecimal,
  renderEmail,
  renderDate,
  renderDateTime,
  renderTime,
  renderBoolean,
  renderAmount,
  renderWeek,
  renderThumb,
  sortByBoolean,
  sortByString,
  sortByTime,
  sortByNumber
}

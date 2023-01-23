import React, { ReactNode } from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { Tag, TagProps } from "antd"
import { ReadOutlined } from "@ant-design/icons"
import rehypeRaw from 'rehype-raw'
import ReactJsonView from 'react-json-view'
import { setScrollPosition } from "~/ResponsiveTable//ManageScroll"
import { getLocaleDecimalValue, isObject } from "@packages/utilities/lib/util"
import ReactMarkdown from 'react-markdown'
import { parseJSON } from "@packages/utilities/lib/parser"
import DownloadableLink from "./DownloadableLink"
import Text from "antd/lib/typography/Text"
import { CopyToClipboard } from "~/Actions/CopyToClipboard"

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
const renderLink = (url: string, text: string, isModal?: boolean, isExternal?: boolean, options?: {
  forceRefresh: boolean
}) =>
  text ? (
    isExternal ?
      <a href={url} target={"_blank"} rel={"noreferrer noopener"}>
        {text} <span style={{ verticalAlign: "baseline" }} className="glyphicon glyphicon-new-window" />
      </a>
      : !isModal ? (
        <Link id={url} onClick={() => setScrollPosition(url)} to={{
          pathname: url,
          state: { forceRefresh: options?.forceRefresh }
        }}>
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
const renderAmount = (text: any) => text !== undefined ? `$ ${getLocaleDecimalValue(text)}` : ""
const renderHtml = (data = '') => <ReactMarkdown children={data} rehypePlugins={[rehypeRaw]} />
const renderJson = (data: any, expandLevel = 0) => <ReactJsonView style={{ wordBreak: 'break-word' }} src={parseJSON(data)} name={false} displayObjectSize={false} displayDataTypes={false} collapsed={expandLevel} />
const renderCopyToClipboard = (content: any, options: { successMessage?: string; title?: ReactNode; } | undefined) => <CopyToClipboard content={content} title={options?.title} successMessage={options?.successMessage} />

const renderBoolean = (text: any, options?: { truthyText?: string, falsyText?: string, uncolorize?: boolean, tagColor?: TagProps['color'] }) => {
  const formattedText = text ? (options?.truthyText || "Yes") : (options?.falsyText || "No")
  const data = options?.uncolorize ? formattedText : <Text type={text ? 'success' : 'warning'}>{formattedText}</Text>
  if (typeof text === "boolean") {
    return options?.tagColor ? <Tag color={options?.tagColor}>{data}</Tag> : data
  } else return ""
}

const renderActiveStatus = (status: any) => {
  return renderBoolean(status, { truthyText: 'Active', falsyText: 'Inactive', tagColor: status ? '#4B8400' : '#A35A00', uncolorize: true })
}

const renderWeek = (text: any[]) => {
  const weeks: string[] = ["Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return text && Array.isArray(text) && weeks.filter((x, i) => text.includes(i + 1))
}

const renderThumb = (url: string, alt?: string) => {
  if (!url) return undefined
  return <a className="external-link" target={"_blank"} rel={"noopener noreferrer"} href={url}><img className="thumb" src={url} alt={alt || url} /></a>
}

const renderAnswer = (value: any, record: any) => {
  if (!record) return undefined
  if (typeof value === 'boolean') return renderBoolean(value)
  switch (record.type) {
    case 'date':
      return renderDate(value)
    case 'attachment':
      return <DownloadableLink link={value} />
    case 'signature':
      return <DownloadableLink link={value} />
    case 'composite':
      return Object.values(value || {}).sort((a: any, b: any) => b.order - a.order).map((i: any) => isObject(i.answer) ? i.answer.label : i.answer).join(', ')
    case 'select':
      return isObject(value) ? value.label : value
    default:
      return value
  }
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
  renderActiveStatus,
  renderAmount,
  renderWeek,
  renderThumb,
  renderHtml,
  renderJson,
  renderAnswer,
  renderCopyToClipboard,
  sortByBoolean,
  sortByString,
  sortByTime,
  sortByNumber,
}

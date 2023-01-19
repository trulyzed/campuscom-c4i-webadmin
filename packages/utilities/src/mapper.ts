import moment, { Moment, isMoment } from "moment"
import { DATE_PAYLOAD_FORMAT, DATE_TIME_PAYLOAD_FORMAT } from "./Configs/format"

export const mapToPayloadDateTime = (date?: Date | Moment | string, dateOnly?: boolean, format?: string): string | undefined => {
  if (!date) return undefined
  format = format || (dateOnly && DATE_PAYLOAD_FORMAT) || DATE_TIME_PAYLOAD_FORMAT
  return isMoment(date) ? date.format(format) : moment(date).format(format)
}

export const mapDatetimeToPayload = (date?: string, dateOnly?: boolean, format?: string): string | undefined => {
  if (!date) return undefined
  format = format || (dateOnly && DATE_PAYLOAD_FORMAT) || DATE_TIME_PAYLOAD_FORMAT
  return moment(date).format(format)
}

export const convertToString = (value: any, isHTML?: boolean): string => {
  value = typeof value === "string" ? value : value !== undefined ? JSON.stringify(value) : value

  if (isHTML && value !== undefined) {
    const tempEl = document.createElement("div")
    tempEl.innerHTML = value
    value = tempEl.textContent || tempEl.innerText
  }

  return value
}

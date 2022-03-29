import moment, { Moment } from "moment"
import { DATE_PAYLOAD_FORMAT, DATE_TIME_PAYLOAD_FORMAT } from "~/Configs/format"

export const mapPayloadToDatetime = (date?: Moment, dateOnly?: boolean, format?: string): string | undefined => {
  if (!date) return undefined
  format = format || ((dateOnly && DATE_PAYLOAD_FORMAT) || DATE_TIME_PAYLOAD_FORMAT)
  return date.format(format)
}

export const mapDatetimeToPayload = (date?: string, dateOnly?: boolean, format?: string): string | undefined => {
  if (!date) return undefined
  format = format || ((dateOnly && DATE_PAYLOAD_FORMAT) || DATE_TIME_PAYLOAD_FORMAT)
  return moment(date).format(format)
}
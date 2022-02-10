import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableProps, ColumnType } from "antd/lib/table"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"

export { ResponsiveTable } from "~/ResponsiveTable/Responsive"
export {
  renderDetailsLink,
  renderLink,
  renderDecimal,
  renderEmail,
  renderDate,
  renderDateTime,
  renderTime,
  renderAmount,
  renderBoolean,
  renderWeek,
  sortByBoolean,
  sortByString,
  sortByTime,
  sortByNumber
} from "~/ResponsiveTable/tableUtils"

interface CustomColumnType<RecordType> extends ColumnType<RecordType> {
  columnPosition?: number
  hidden?: boolean
}

export type TableColumnType = CustomColumnType<{ [key: string]: any }>[]

export interface IDataTableProps extends TableProps<{ [key: string]: any }> {
  columns: TableColumnType
  tableName?: string
  searchParams?: any
  searchFunc?: (Params: any, headers?: { [key: string]: any }) => Promise<IApiResponse>
  dataLoaded?: (Params: any) => void
  breakpoints?: Breakpoint[]
  isModal?: boolean
  refreshEventName?: string
  rowKey?: string
  hidePagination?: boolean
  hideSettings?: boolean
  hideDownload?: boolean
  disableSorting?: boolean
  currentPagination?: number
  setCurrentPagination?: (page: number) => void
  actions?: React.ReactNode[]
}

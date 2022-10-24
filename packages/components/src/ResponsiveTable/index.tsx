import { TableProps, ColumnType } from "antd/lib/table"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"

export { ResponsiveTable } from "~/ResponsiveTable/Responsive"
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
  sortByNumber
} from "~/ResponsiveTable/tableUtils"

interface CustomColumnType<RecordType> extends ColumnType<RecordType> {
  columnPosition?: number
  hidden?: boolean
  ariaLabel?: string
}

export type TableColumnType = CustomColumnType<{ [key: string]: any }>[]

export interface IDataTableProps extends TableProps<{ [key: string]: any }> {
  columns: TableColumnType
  tableName?: string
  searchParams?: any
  searchFunc?: IQuery
  dataLoaded?: (Params: any) => void
  breakpoints?: Breakpoint[]
  isModal?: boolean
  refreshEventName?: string
  hidePagination?: boolean
  hideSettings?: boolean
  showDownload?: boolean
  disableSorting?: boolean
  currentPagination?: number
  setCurrentPagination?: (page: number) => void
  actions?: React.ReactNode[]
  expandedRowColumns?: TableColumnType
  expandedRowDataIndex?: string
}

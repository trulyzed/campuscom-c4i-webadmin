import { TableProps } from "antd"
import { TableColumnType } from "~/ResponsiveTable"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"

export interface ITableMeta {
  columns: TableColumnType
  tableName?: string
  refreshEventName?: string
  hidePagination?: boolean
  hideSettings?: boolean
  showDownload?: boolean
  searchFunc: IQuery
  scroll?: TableProps<any>["scroll"]
}

export interface ITableMetaWithDataSource {
  columns: TableColumnType
  tableName?: string
  dataSource: any
}

import { TableColumnType } from "~/packages/components/ResponsiveTable"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

export interface ITableMeta {
  columns: TableColumnType
  tableName?: string
  refreshEventName?: string
  hidePagination?: boolean
  hideSettings?: boolean
  hideDownload?: boolean
  searchFunc: IQuery
}

export interface ITableMetaWithDataSource {
  columns: TableColumnType
  tableName?: string
  dataSource: any
}

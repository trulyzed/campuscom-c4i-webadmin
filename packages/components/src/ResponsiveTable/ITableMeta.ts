import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/ResponsiveTable"

export interface ITableMeta {
  columns: TableColumnType
  tableName?: string
  refreshEventName?: string
  hidePagination?: boolean
  hideSettings?: boolean
  hideDownload?: boolean
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
}

export interface ITableMetaWithDataSource {
  columns: TableColumnType
  tableName?: string
  dataSource: any
}

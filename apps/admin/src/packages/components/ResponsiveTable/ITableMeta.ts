import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { TableColumnType } from "~/packages/components/ResponsiveTable"

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

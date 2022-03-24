import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const storeListTableColumns: TableColumnType = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any, record: any) => record.id ? renderLink(`/administration/store/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Slug",
    dataIndex: 'url_slug',
    sorter: (a: any, b: any) => a.url_slug - b.url_slug
  },
]

export const getStoreListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: storeListTableColumns,
    searchFunc: QueryConstructor((params) => StoreQueries.getPaginatedList(params), [StoreQueries.getList]),
  }
}

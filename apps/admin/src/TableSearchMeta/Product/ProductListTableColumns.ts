import { renderBoolean, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const productListTableColumns: TableColumnType = [
  {
    title: 'ID',
    dataIndex: 'ref_id',
    render: (text: any, record: any) => renderLink(`/store/product/${record.id}`, text),
    sorter: (a: any, b: any) => a.ref_id - b.ref_id
  },
  {
    title: 'Store',
    dataIndex: 'store',
    render: (text: any, record: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: 'Product Title',
    dataIndex: 'title',
    sorter: (a: any, b: any) => a.title - b.title,
  },
  {
    title: 'Type',
    dataIndex: 'product_type',
    sorter: (a: any, b: any) => a.product_type - b.product_type,
  },
  {
    title: "Active Status",
    dataIndex: "active_status",
    render: renderBoolean
  }
]

export const getProductListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: productListTableColumns,
    searchFunc: QueryConstructor((params) => ProductQueries.getList(params), [ProductQueries.getList]),
    tableName: 'Product'
  }
}

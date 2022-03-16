import { TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { CartItemQueries } from "~/packages/services/Api/Queries/AdminQueries/CartItem"
import { ConstructQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const getCartItemListTableColumns = (isModal = false, OrderId?: number): ITableMeta => {
  const columns: TableColumnType = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      //render: (text: any, record: any) => renderLink(`/institute/course/${record.id}`, text, isModal),
      sorter: (a: any, b: any) => a.product_name - b.product_name
    },
    {
      title: "Quantity",
      dataIndex: 'quantity',
      sorter: (a: any, b: any) => a.quantity - b.quantity
    },
  ]

  return {
    columns,
    searchFunc: ConstructQuery((params) => CartItemQueries.getList(params), CartItemQueries.getList.__permission),
  }
}

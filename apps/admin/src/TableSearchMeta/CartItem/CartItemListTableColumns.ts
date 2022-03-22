import { TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { CartItemQueries } from "~/packages/services/Api/Queries/AdminQueries/CartItem"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

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
    {
      title: "Unit Price",
      dataIndex: 'unit_price',
      sorter: (a: any, b: any) => a.unit_price - b.unit_price
    },
    {
      title: 'Extended Amount',
      dataIndex: 'extended_amount',
      sorter: (a: any, b: any) => a.extended_amount - b.extended_amount
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount',
      sorter: (a: any, b: any) => a.discount - b.discount
    },
    {
      title: 'Sales Tax',
      dataIndex: 'sales_tax',
      sorter: (a: any, b: any) => a.sales_tax - b.sales_tax
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      sorter: (a: any, b: any) => a.total_amount - b.total_amount
    },
  ]

  return {
    columns,
    searchFunc: QueryConstructor((params) => CartItemQueries.getList(params), [CartItemQueries.getList]),
  }
}

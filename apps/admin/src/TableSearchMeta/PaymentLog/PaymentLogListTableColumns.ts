import { renderDate, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { PaymentLogQueries } from "@packages/services/lib/Api/Queries/AdminQueries/PaymentLogs"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const paymentLogListTableColumns: TableColumnType = [
  {
    title: "Summary",
    dataIndex: "summary",
    render: (text: any, record: any) => renderLink(`/administration/log/payment/${record.id}`, text),
    sorter: (a: any, b: any) => a.summary - b.summary
  },
  {
    title: "Date",
    dataIndex: "created_at",
    render: renderDate,
    sorter: (a: any, b: any) => a.created_at - b.created_at
  },
  {
    title: "Order",
    dataIndex: "cart",
    render: (text: any) => renderLink(`/storefront-data/order/${text.id}`, text.order_ref),
    sorter: (a: any, b: any) => a.cart.order_ref - b.cart.order_ref
  },
]

export const getPaymentLogListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: paymentLogListTableColumns,
    searchFunc: QueryConstructor((params) => PaymentLogQueries.getPaginatedList(params), [PaymentLogQueries.getPaginatedList]),
    tableName: 'PaymentLog'
  }
}

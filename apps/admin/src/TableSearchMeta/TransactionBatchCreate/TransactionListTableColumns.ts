import { renderDate, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const transactionListTableColumns: TableColumnType = [
  {
    title: "Order ID",
    dataIndex: "cart",
    render: (text) => renderLink(`/storefront-data/order/${text.id}`, text.order_ref, undefined, true),
    sorter: (a: any, b: any) => a.cart.order_ref - b.cart.order_ref
  },
  {
    title: "Order Date",
    dataIndex: "cart",
    render: (text) => renderDate(text.created_at),
    sorter: (a: any, b: any) => a.cart.created_at - b.cart.created_at,
  },
  {
    title: "Status",
    dataIndex: "settlement_status",
    sorter: (a: any, b: any) => a.settlement_status - b.settlement_status
  },
  {
    title: "Gross Order Value",
    dataIndex: "cart",
    render: (text) => text.gross_amount,
    sorter: (a: any, b: any) => a.cart.gross_amount - b.cart.gross_amount
  },
  {
    title: "Discount",
    dataIndex: "cart",
    render: (text) => text.total_discount,
    sorter: (a: any, b: any) => a.cart.total_discount - b.cart.total_discount
  },
  {
    title: "Net Order Value",
    dataIndex: "cart",
    render: (text) => text.total_amount,
    sorter: (a: any, b: any) => a.cart.total_amount - b.cart.total_amount
  },
  {
    title: "Card Fees",
    dataIndex: "cart",
    render: () => 0,
    sorter: (a: any, b: any) => a.cart.card_fees - b.cart.card_fees
  },
  {
    title: "Net Payment Received",
    dataIndex: "cart",
    render: (text) => text.total_amount,
    sorter: (a: any, b: any) => a.cart.total_amount - b.cart.total_amount
  },
]

export const getTransactionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: transactionListTableColumns,
    searchFunc: QueryConstructor(
      (params) => TransactionQueries.getList(params),
      [TransactionQueries.getList]
    ),
    tableName: "TransactionBatchCreate",
    showDownload: false,
    hideSettings: true
  }
}

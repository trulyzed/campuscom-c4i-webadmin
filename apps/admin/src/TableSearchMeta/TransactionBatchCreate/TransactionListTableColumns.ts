import { renderDate, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const transactionListTableColumns: TableColumnType = [
  {
    title: "Order ID",
    dataIndex: "order_id",
    sorter: (a: any, b: any) => a.order_id - b.order_id
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    render: renderDate,
    sorter: (a: any, b: any) => a.transaction_date - b.transaction_date,
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a: any, b: any) => a.status - b.status
  },
  {
    title: "Gross Order Value",
    dataIndex: "gross_order_value",
    sorter: (a: any, b: any) => a.gross_order_value - b.gross_order_value
  },
  {
    title: "Discount",
    dataIndex: "Discount",
    sorter: (a: any, b: any) => a.Discount - b.Discount
  },
  {
    title: "Net Order Value",
    dataIndex: "net_order_value",
    sorter: (a: any, b: any) => a.net_order_value - b.net_order_value
  },
  {
    title: "Card Fees",
    dataIndex: "card_fees",
    sorter: (a: any, b: any) => a.card_fees - b.card_fees
  },
  {
    title: "Net Payment Received",
    dataIndex: "net_payment_received",
    sorter: (a: any, b: any) => a.net_payment_received - b.net_payment_received
  },
]

export const getTransactionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: transactionListTableColumns,
    searchFunc: QueryConstructor(
      (params) => TransactionQueries.getPaginatedList(params),
      [TransactionQueries.getPaginatedList]
    ),
    tableName: "TransactionBatchCreate",
    showDownload: false,
    hideSettings: true
  }
}

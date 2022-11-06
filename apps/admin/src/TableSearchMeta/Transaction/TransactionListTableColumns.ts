import { renderDate, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"

export const transactionListTableColumns: TableColumnType = [
  {
    title: "Order ID",
    dataIndex: "cart",
    render: (text) => renderLink(`/storefront-data/order/${text.id}`, text.order_ref, undefined, true),
    sorter: (a: any, b: any) => a.cart.order_ref - b.cart.order_ref
  },
  {
    title: "Store",
    dataIndex: "cart",
    render: (text) => renderLink(`/administration/store/${text.store.id}`, text.store.name),
    sorter: (a: any, b: any) => a.cart.store.name - b.cart.store.name,
  },
  {
    title: "Order Date",
    dataIndex: "cart",
    render: (text) => renderDate(text.created_at),
    sorter: (a: any, b: any) => a.cart.created_at - b.cart.created_at,
  },
  {
    title: "Gross Order Amount",
    dataIndex: "cart",
    render: (text) => text.gross_order_amount,
    sorter: (a: any, b: any) => a.cart.gross_order_amount - b.cart.gross_order_amount
  },
  {
    title: "Discount",
    dataIndex: "cart",
    render: (text) => text.discount,
    sorter: (a: any, b: any) => a.cart.discount - b.cart.discount
  },
  {
    title: "Net Order Amount",
    dataIndex: "cart",
    render: (text) => text.net_order_amount,
    sorter: (a: any, b: any) => a.cart.net_order_amount - b.cart.net_order_amount
  },
  {
    title: "Card Fees",
    dataIndex: "cart",
    render: (text) => text.card_fees,
    sorter: (a: any, b: any) => a.cart.card_fees - b.cart.card_fees
  },
  {
    title: "Net Payment Received",
    dataIndex: "cart",
    render: (text) => text.net_payment_received,
    sorter: (a: any, b: any) => a.cart.net_payment_received - b.cart.net_payment_received
  },
]

export const getTransactionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: transactionListTableColumns,
    searchFunc: TransactionQueries.getList,
    tableName: "Transaction",
    showDownload: false,
    hideSettings: true
  }
}

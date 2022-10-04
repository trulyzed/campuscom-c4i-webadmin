import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { PaymentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Payments"

export const getPaymentListTableColumns = (isModal = false, OrderID?: number): ITableMeta => {
  const columns: TableColumnType = [
    {
      title: 'Payment ID',
      dataIndex: 'transaction_request_id',
      render: (text: any, record: any) => renderLink(`/storefront-data/payment/${record.id}`, text, isModal),
      sorter: (a: any, b: any) => a.transaction_request_id - b.transaction_request_id
    },
    {
      title: 'Store',
      dataIndex: 'store',
      //render: (text: any, record: any) => renderLink(`/financials/order/${record.id}`, record.store.name, isModal),
      render: (text: any, record: any) => text.name,
    },
    {
      title: 'Order Ref',
      dataIndex: 'cart',
      render: (text: any, record: any) => renderLink(`/storefront-data/order/${text.id}`, text.order_ref, isModal),
    },
    {
      title: 'Store Payment Gateway',
      dataIndex: 'store_payment_gateway',
      render: (text: any, record: any) => text?.name,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Transaction Reference',
      dataIndex: 'transaction_reference',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ]

  return {
    columns,
    searchFunc: PaymentQueries.getPaginatedList,
    tableName: 'Payment',
    showDownload: true,
  }
}

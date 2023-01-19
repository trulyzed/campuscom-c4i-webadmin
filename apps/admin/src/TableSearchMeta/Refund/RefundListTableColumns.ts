import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { RefundQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Refunds"

export const refundListTableColumns: TableColumnType = [
  {
    title: 'Refund ID',
    dataIndex: "id",
    render: (text: any, record: any) => renderLink(`/storefront-data/refund/${text}`, text),
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: 'Payment ID',
    dataIndex: "payment",
    render: (text: any, record: any) => renderLink(`/storefront-data/payment/${text.id}`, text.transaction_request_id),
    sorter: (a: any, b: any) => a.payment - b.payment
  },
  {
    title: 'Store',
    dataIndex: "store",
    render: (text: any, record: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store - b.store
  },
  {
    title: 'Student',
    dataIndex: "profile",
    render: (text: any, record: any) => renderLink(`/storefront-data/student/${text.id}`, `${text.first_name} ${text.last_name}`),
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: 'Paid Amount',
    dataIndex: "paid_amount",
    sorter: (a: any, b: any) => a.paid_amount - b.paid_amount
  },
  {
    title: 'Refund Amount',
    dataIndex: "amount",
    sorter: (a: any, b: any) => a.amount - b.amount
  },
  {
    title: 'Refund Status',
    dataIndex: "status",
    sorter: (a: any, b: any) => a.status - b.status
  },
  {
    title: 'Cancel Enrollment',
    dataIndex: "task_cancel_enrollment",
    sorter: (a: any, b: any) => a.task_cancel_enrollment - b.task_cancel_enrollment
  },
  // {
  //   title: 'Tax Refund',
  //   dataIndex: "task_tax_refund",
  //   sorter: (a: any, b: any) => a.task_tax_refund - b.task_tax_refund
  // },
  // {
  //   title: 'CRM Update',
  //   dataIndex: "task_crm_update",
  //   sorter: (a: any, b: any) => a.task_crm_update - b.task_crm_update
  // },
]

export const getRefundListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: refundListTableColumns,
    searchFunc: QueryConstructor((params) => RefundQueries.getList(params), [RefundQueries.getList]),
    tableName: 'Refund'
  }
}

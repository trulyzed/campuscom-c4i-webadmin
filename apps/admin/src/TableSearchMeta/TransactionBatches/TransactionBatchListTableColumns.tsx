import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const transactionBatchListTableColumns: TableColumnType = [
  {
    title: "Batch Name",
    dataIndex: "name",
    render: (text: any, record: any) => renderLink(`/storefront-data/transaction-batch/${record.id}`, text),
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.start_date - b.start_date
  },
  {
    title: "End Date",
    dataIndex: "end_date",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.end_date - b.end_date
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a: any, b: any) => a.status - b.status
  },
  {
    title: "Action",
    dataIndex: 'action',
    render: (_, record: any) => (
      <>
        <ContextAction
          type="download"
          tooltip="Download Transaction Batch"
          queryService={QueryConstructor((params) => TransactionBatchQueries.download({ ...params, params: { transaction_batch: record.id } }), [TransactionBatchQueries.download])}
        />
        {record.status === "unpaid" ? <ContextAction
          type="delete"
          tooltip="Delete Transaction Batch"
          queryService={QueryConstructor(() => TransactionBatchQueries.delete({ data: { id: [record.id] } }), [TransactionBatchQueries.delete])}
          refreshEventName="REFRESH_PAGE"
        /> : null}
      </>
    )
  }
]

export const getTransactionBatchListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: transactionBatchListTableColumns,
    searchFunc: QueryConstructor((params) => TransactionBatchQueries.getList(params), [TransactionBatchQueries.getList]),
    tableName: 'TransactionBatch'
  }
}

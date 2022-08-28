import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const transactionBatchListTableColumns: TableColumnType = [
  {
    title: "Course Provider",
    dataIndex: "course_provider",
    render: (text) => renderLink(`/administration/course-provider/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.course_provider.name - b.course_provider.name
  },
  {
    title: "Store",
    dataIndex: "store",
    render: (text) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: "End Date",
    dataIndex: "end_date",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.end_date - b.end_date
  },
  {
    title: "Action",
    dataIndex: 'action',
    render: (_, record: any) => (
      <>
        <ContextAction
          type="download"
          tooltip="Download Settlement Batch"
          queryService={QueryConstructor((params) => TransactionBatchQueries.download({ ...params, params: { transaction_batch: record.id } }), [TransactionBatchQueries.download])}
        />
        {record.status === "unpaid" ? <ContextAction
          type="delete"
          tooltip="Delete Settlement Batch"
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

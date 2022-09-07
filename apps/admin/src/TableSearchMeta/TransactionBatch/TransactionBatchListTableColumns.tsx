import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { renderBoolean } from "@packages/components/lib/ResponsiveTable/tableUtils"

export const transactionBatchListTableColumns: TableColumnType = [
  {
    title: "Batch ID",
    dataIndex: "batch_ref",
    render: (text, record) => renderLink(`/transaction/settlement-batch/${record.id}`, text),
    sorter: (a: any, b: any) => a.batch_ref - b.batch_ref
  },
  {
    title: "Course Provider",
    dataIndex: "filter_params",
    render: (text: any) => text.course_provider ? renderLink(`/administration/course-provider/${text.course_provider.id}`, text.course_provider.name) : undefined,
    sorter: (a: any, b: any) => a.filter_params.course_provider?.name.length - b.filter_params.course_provider?.name.length
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => renderBoolean(text === "paid", { truthyText: "Paid", falsyText: "Unpaid", uncolorize: true, tagColor: text === "paid" ? "#4B8400" : "#AAAAAA" }),
    sorter: (a: any, b: any) => a.status - b.status
  },
  {
    title: "Settlement Date",
    dataIndex: "payment_date",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.payment_date - b.payment_date
  },
  {
    title: "Action",
    dataIndex: 'action',
    render: (_, record: any) => (
      <>
        <ContextAction
          type="download"
          tooltip="Download Settlement Batch"
          queryService={QueryConstructor((params) => TransactionBatchQueries.download({ ...params, params: { transaction_batch: record.id, batch_ref: record.batch_ref } }), [TransactionBatchQueries.download])}
        />
        {record.status === "unpaid" ? <ContextAction
          type="delete"
          tooltip="Delete Settlement Batch"
          queryService={QueryConstructor(() => TransactionBatchQueries.delete({ data: { ids: [record.id] } }), [TransactionBatchQueries.delete])}
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

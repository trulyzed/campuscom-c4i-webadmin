import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { ImportTaskQueries } from "~/packages/services/Api/Queries/AdminQueries/ImportTasks"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const importTaskListTableColumns: TableColumnType = [
  {
    title: "Ref Id",
    dataIndex: 'ref_id',
    sorter: (a: any, b: any) => a.ref_id - b.ref_id
  },
  {
    title: "Import Type",
    dataIndex: 'import_type',
    sorter: (a: any, b: any) => a.import_type - b.import_type
  },
  {
    title: "Course Provider",
    dataIndex: 'course_provider',
    render: (text: any, record: any) => text ? renderLink(`/administration/course-provider/${text.id}`, text.name) : null,
    sorter: (a: any, b: any) => a.course_provider?.name - b.course_provider?.name
  },
  {
    title: "Store",
    dataIndex: 'store',
    render: (text: any, record: any) => text ? renderLink(`/administration/store/${text.id}`, text.name) : null,
    sorter: (a: any, b: any) => a.store?.name - b.store?.name
  },
  {
    title: "Filename",
    dataIndex: 'filename',
    render: (text: any, record: any) => renderLink(text, text, false, true),
    sorter: (a: any, b: any) => a.filename - b.filename
  },
  {
    title: "Status",
    dataIndex: 'status',
    sorter: (a: any, b: any) => a.status - b.status
  },
  {
    title: "Status Message",
    dataIndex: 'status_message',
    sorter: (a: any, b: any) => a.status_message - b.status_message
  },
  // {
  //   title: "Action",
  //   dataIndex: "id",
  //   render: (text, record) => (
  //     record.status === "failed" && record.queue_processed > 0 ? <ContextAction
  //       type="refresh"
  //       tooltip="Requeue"
  //       refreshEventName="REFRESH_IMPORT_TASK"
  //       queryService={QueryConstructor(() => ImportTaskQueries.requeue({ data: { import_task_id: text } }), [ImportTaskQueries.requeue])}
  //     /> : null
  //   )
  // },
]

export const getImportTaskListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: importTaskListTableColumns,
    searchFunc: QueryConstructor((params) => ImportTaskQueries.getPaginatedList(params), [ImportTaskQueries.getPaginatedList]),
    tableName: 'ImportTask',
    refreshEventName: 'REFRESH_IMPORT_TASK',
  }
}

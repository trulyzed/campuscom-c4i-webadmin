import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { ImportTaskQueries } from "~/packages/services/Api/Queries/AdminQueries/ImportTasks"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"

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
    render: (text: any, record: any) => renderLink(`/administration/course-provider/${text}`, text),
    sorter: (a: any, b: any) => a.course_provider - b.course_provider
  },
  {
    title: "Store",
    dataIndex: 'store',
    render: (text: any, record: any) => renderLink(`/administration/store/${text}`, text),
    sorter: (a: any, b: any) => a.store - b.store
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
  {
    title: "Action",
    dataIndex: "id",
    render: (text, record) => (
      record.queue_processed > 0 ? <IconButton
        iconType="refresh"
        toolTip="Requeue"
        refreshEventName="REFRESH_IMPORT_TASK"
        onClick={() => ImportTaskQueries.requeue({ data: { import_task_id: text } })}
      /> : null
    )
  },
]

export const getImportTaskListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: importTaskListTableColumns,
    searchFunc: QueryConstructor((params) => ImportTaskQueries.getPaginatedList(params), [ImportTaskQueries.getPaginatedList]),
    tableName: 'ImportTask',
    refreshEventName: 'REFRESH_IMPORT_TASK',
  }
}

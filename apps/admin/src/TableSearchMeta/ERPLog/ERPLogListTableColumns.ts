import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { ERPLogQueries } from "@packages/services/lib/Api/Queries/AdminQueries/ERPLogs"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const ERPLogListTableColumns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "id",
    render: (text: any, record: any) => renderLink(`/administration/log/erp/${record.id}`, text),
    sorter: (a: any, b: any) => a.id - b.id
  },
  {
    title: "Course Provider",
    dataIndex: "course_provider",
    render: (text: any) => renderLink(`/administration/course-provider/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.course_provider.name - b.course_provider.name
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: (a: any, b: any) => a.type - b.type
  },
  {
    title: "ERP",
    dataIndex: "ERP",
    sorter: (a: any, b: any) => a.ERP - b.ERP
  },
  {
    title: "Status Code",
    dataIndex: "status_code",
    sorter: (a: any, b: any) => a.status_code - b.status_code
  },
  {
    title: "Action",
    dataIndex: "action",
    sorter: (a: any, b: any) => a.action - b.action
  },
  {
    title: "Date",
    dataIndex: "created_at",
    render: (text: any) => renderDateTime(text),
    sorter: (a: any, b: any) => a.created_at - b.created_at
  },
]

export const getERPLogListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: ERPLogListTableColumns,
    searchFunc: QueryConstructor((params) => ERPLogQueries.getPaginatedList(params), [ERPLogQueries.getPaginatedList]),
    tableName: 'ERPLog'
  }
}

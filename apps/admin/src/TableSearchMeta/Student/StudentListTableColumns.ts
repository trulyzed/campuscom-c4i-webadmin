import { TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { StudentQueries } from "~/packages/services/Api/Queries/AdminQueries/Students"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const studentListTableColumns: TableColumnType = [
  {
    title: "First Name",
    dataIndex: "first_name",
    //render: (text: any, record: any) => renderLink(`/institute/course/${record.id}`, text, isModal),
    sorter: (a: any, b: any) => a.first_name - b.first_name
  },
  {
    title: "Last Name",
    dataIndex: 'last_name',
    sorter: (a: any, b: any) => a.last_name - b.last_name
  },
  {
    title: "Email",
    dataIndex: 'email',
    sorter: (a: any, b: any) => a.email - b.email
  },
]

export const getStudentListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: studentListTableColumns,
    searchFunc: QueryConstructor((params) => StudentQueries.getList(params), [StudentQueries.getList]),
  }
}

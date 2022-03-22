import { renderDate, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { StudentQueries } from "~/packages/services/Api/Queries/AdminQueries/Students"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const studentListTableColumns: TableColumnType = [
  {
    title: "First Name",
    dataIndex: "first_name",
    render: (text: any, record: any) => record.id ? renderLink(`/storefront-data/student/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.first_name - b.first_name
  },
  {
    title: "Last Name",
    dataIndex: 'last_name',
    sorter: (a: any, b: any) => a.last_name - b.last_name
  },
  {
    title: "Date of Birth",
    dataIndex: 'date_of_birth',
    sorter: (a: any, b: any) => a.date_of_birth - b.date_of_birth,
    render: (text: any, record: any) => renderDate(text)
  },
]

export const getStudentListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: studentListTableColumns,
    searchFunc: QueryConstructor((params) => StudentQueries.getPaginatedList(params), [StudentQueries.getList]),
  }
}

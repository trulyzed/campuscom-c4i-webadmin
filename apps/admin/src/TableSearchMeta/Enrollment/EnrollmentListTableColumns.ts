import { renderDateTime, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { EnrollmentQueries } from "~/packages/services/Api/Queries/AdminQueries/Enrollments"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const enrollmentListTableColumns: TableColumnType = [
  {
    title: 'Student',
    dataIndex: 'profile',
    render: (text: any, record: any) => `${text.first_name} ${text.last_name}`,
    sorter: (a: any, b: any) => a.first_name - b.first_name
  },
  {
    title: 'Store',
    dataIndex: 'store',
    render: (text: any, record: any) => text.name,
    sorter: (a: any, b: any) => a.store - b.store
  },
  {
    title: 'Course',
    dataIndex: 'course',
    render: (text: any, record: any) => text.title,
    sorter: (a: any, b: any) => a.course - b.course
  },
  {
    title: 'Section',
    dataIndex: 'section',
    render: (text: any, record: any) => text.name,
    sorter: (a: any, b: any) => a.section - b.section
  },
  {
    title: 'Application Time',
    dataIndex: 'application_time',
    render: renderDateTime,
    sorter: (a: any, b: any) => a.application_time - b.application_time
  },
  {
    title: 'Enrollment Status',
    dataIndex: 'status',
    sorter: (a: any, b: any) => a.status - b.status
  },
]

export const getStudentListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: enrollmentListTableColumns,
    searchFunc: QueryConstructor((params) => EnrollmentQueries.getList(params), [EnrollmentQueries.getList]),
  }
}

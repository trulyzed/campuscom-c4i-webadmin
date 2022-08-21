import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const enrollmentListTableColumns: TableColumnType = [
  {
    title: "Enrollment ID",
    dataIndex: "ref_id",
    render: (text: any, record: any) => renderLink(`/storefront-data/course-enrollment/${record.id}`, text),
    sorter: (a: any, b: any) => a.ref_id - b.ref_id
  },
  {
    title: 'Student',
    dataIndex: 'profile',
    render: (text: any) => renderLink(`/storefront-data/student/${text.id}`, `${text.first_name} ${text.last_name}`),
    sorter: (a: any, b: any) => a.first_name - b.first_name
  },
  {
    title: 'Store',
    dataIndex: 'store',
    render: (text: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store - b.store
  },
  {
    title: 'Course',
    dataIndex: 'course',
    render: (text: any) => renderLink(`/institute/course/${text.id}`, text.title),
    sorter: (a: any, b: any) => a.course - b.course
  },
  {
    title: 'Section',
    dataIndex: 'section',
    render: (text: any) => renderLink(`/institute/section/${text.id}`, text.name),
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

export const getEnrollmentListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: enrollmentListTableColumns,
    searchFunc: QueryConstructor((params) => EnrollmentQueries.getPaginatedList(params), [EnrollmentQueries.getPaginatedList]),
    tableName: 'Enrollment'
  }
}

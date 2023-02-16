import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"

export const enrollmentListTableColumns: TableColumnType = [
  {
    title: "Enrollment ID",
    dataIndex: "ref_id",
    render: (text: any, record: any) => renderLink(`/storefront-data/enrollment/${record.id}`, text),
    sorter: (a: any, b: any) => a.ref_id - b.ref_id
  },
  {
    title: 'Course',
    dataIndex: 'course',
    render: (text: any) => renderLink(`/course-provider/course/${text.id}`, text.title),
    sorter: (a: any, b: any) => a.course - b.course
  },
  {
    title: 'Section',
    dataIndex: 'section',
    render: (text: any) => renderLink(`/course-provider/section/${text.id}`, text.name),
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
    searchFunc: EnrollmentQueries.getCourseEnrollmentList,
    tableName: 'Enrollment',
    refreshEventName: "REFRESH_ENROLLMENT_LIST"
  }
}

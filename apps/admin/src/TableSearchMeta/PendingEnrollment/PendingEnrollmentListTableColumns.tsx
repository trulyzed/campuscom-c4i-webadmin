import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const pendingEnrollmentListTableColumns: TableColumnType = [
  {
    title: "Enrollment ID",
    dataIndex: "ref_id",
    render: (text: any, record: any) => renderLink(`/storefront-data/pending-approval/${record.id}`, text),
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
  {
    title: 'Approval Status',
    dataIndex: 'approval_status',
    sorter: (a: any, b: any) => a.status - b.status
  },
  {
    title: "Actions",
    dataIndex: 'actions',
    fixed: 'right',
    render: (_, record: any,) => record.approval_status === "pending" ? (
      <>
        <ContextAction
          confirmationType="Approve"
          type="approve"
          tooltip="Approve"
          queryService={QueryConstructor(() => EnrollmentQueries.updateApprovalStatus({
            data: { course_enrollment: record.id, approval_status: "approved" },
          }), [EnrollmentQueries.updateApprovalStatus])}
          refreshEventName={"REFRESH_PENDING_ENROLLMENT_LIST"}
        />
        <ContextAction
          confirmationType="Cancel"
          type="drop"
          tooltip="Cancel"
          queryService={QueryConstructor(() => EnrollmentQueries.updateApprovalStatus({
            data: { course_enrollment: record.id, approval_status: "canceled" },
          }), [EnrollmentQueries.updateApprovalStatus])}
          refreshEventName={"REFRESH_PENDING_ENROLLMENT_LIST"}
          iconColor="warning"
        />
      </>
    ) : null
  }
]

export const getPendingEnrollmentListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: pendingEnrollmentListTableColumns,
    searchFunc: QueryConstructor((params) => EnrollmentQueries.getCourseEnrollmentList({
      ...params,
      params: {
        ...params?.params,
        pending_approval: 'True'
      }
    }), [EnrollmentQueries.getCourseEnrollmentList]),
    tableName: 'PendingEnrollment',
    refreshEventName: "REFRESH_PENDING_ENROLLMENT_LIST"
  }
}

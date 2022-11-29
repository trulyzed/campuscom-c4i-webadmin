import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { renderDateTime, renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { processContacts } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Contacts"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"
import { CreateOrder } from "~/Component/Feature/Orders/Create/CreateOrder"
import { CLOSE_MODAL } from "~/Constants"


export const enrollmentListTableColumns: TableColumnType = [
  {
    title: "Enrollment ID",
    dataIndex: "ref_id",
    render: (text: any, record: any) => renderLink(`/storefront-data/enrollment/${record.id}`, text),
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
    title: "Actions",
    dataIndex: 'actions',
    render: (_, record: any, index) => ((record.status === "pending") || (record.status === "success")) ? (
      <>
        <ContextAction
          type="swap"
          tooltip="Swap"
          modalProps={{
            title: "Swap Student",
            content: <CreateOrder
              initialValue={{
                enrollmentId: record.id,
                reservationId: record.seat_reservation,
                store: record.store,
                purchaser: record.purchaser_info,
                product: record.product,
                profile: processContacts([record.profile]).pop() as Record<string, any>,
              }}
              refreshEventName={[`${CLOSE_MODAL}_ENROLLMENT__${index}`, "REFRESH_ENROLLMENT_LIST"]}
              isSwap
            />,
            closeHandlerEventName: `${CLOSE_MODAL}_ENROLLMENT__${index}`
          }}
        />
        <ContextAction
          confirmationType="Drop/withdraw"
          type="drop"
          tooltip="Drop/Withdraw"
          queryService={QueryConstructor(() => EnrollmentQueries.remove({ data: { course_enrollment: record.id } }), [SeatBlockQueries.removeRegistration])}
          refreshEventName={"REFRESH_ENROLLMENT_LIST"}
          iconColor="warning"
        />
      </>
    ) : null
  }
]

export const getEnrollmentListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: enrollmentListTableColumns,
    searchFunc: EnrollmentQueries.getCourseEnrollmentList,
    tableName: 'Enrollment',
    refreshEventName: "REFRESH_ENROLLMENT_LIST"
  }
}

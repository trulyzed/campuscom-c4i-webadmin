import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { cartItemListTableColumns } from "~/TableSearchMeta/CartItem/CartItemListTableColumns"
import { renderDate, renderLink } from "@packages/components/lib/ResponsiveTable"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"
import { studentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns"
import { enrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { renderJson, renderAnswer } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { PopoverSummaryTable } from "@packages/components/lib/Popover/PopoverSummaryTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { getSeatBlockListTableColumns } from "~/TableSearchMeta/SeatBlock/SeatBlockListTableColumns"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: `Order: ${order.order_ref}`,
    contents: [...[
      { label: 'Store', value: order.store, render: (text: any) => text.name },
      { label: 'Student', value: renderLink(`/storefront-data/student/${order.profile.id}`, `${order.profile.first_name} ${order.profile.last_name}`), },
      { label: 'Enrollment Date', value: order.datetime, render: renderDate },
      { label: 'Status', value: order.cart_status },
      { label: 'Extended amount', value: order.gross_amount },
      { label: 'Discount amount', value: order.total_discount },
      { label: 'Tax amount', value: order.tax_amount },
    ], ...order.purchaser_info.purchasing_for?.type ? [{ label: 'Purchasing for', value: order.purchaser_info.purchasing_for?.type }] : []]
  }

  const purchaserInfo: CardContainer = {
    groupedContents: [
      {
        title: 'Purchaser',
        contents: [
          ...[
            { label: 'First Name', value: order.purchaser_info.first_name, },
            { label: 'Last Name', value: order.purchaser_info.last_name, },
            { label: 'Email', value: order.purchaser_info.primary_email },
          ],
          ...order.purchaser_info.purchasing_for?.type === 'company' ? [{ label: 'Company', value: order.purchaser_info.purchasing_for?.ref?.company_name }] : []
        ],
      },
      {
        title: 'Additional Information',
        contents: processQuestions((order.purchaser_info?.extra_info || []) as any[]).map(i => ({
          label: i.question,
          value: renderAnswer(i.answer, i)
        })),
      }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [basicInfo, purchaserInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "orderSummaryTab"
    },
    {
      tabTitle: "Invoice",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: cartItemListTableColumns,
          dataSource: order.cart_details,
          rowKey: 'id',
          refreshEventName: "REFRESH_INVOICE_TAB",
        }
      },
      helpKey: "invoiceTab"
    },
    {
      tabTitle: "Students",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            ...studentListTableColumns.filter(i => i.dataIndex !== 'date_of_birth'),
            {
              title: "Email",
              dataIndex: "email",
              sorter: (a: any, b: any) => a.email - b.email
            },
            {
              title: "",
              dataIndex: "extra_info",
              render: (value) => (
                <PopoverSummaryTable card={{
                  title: 'Profile Questions',
                  contents: (processQuestions((value || []) as any[])).map((i: any) => ({
                    label: i.question,
                    value: renderAnswer(i.answer, i)
                  }))
                }} />
              ),
            },
          ],
          dataSource: order.student_details,
          rowKey: 'email',
          refreshEventName: "REFRESH_STUDENT_TAB",
        }
      },
      helpKey: "studentTab"
    },
    {
      tabTitle: "Enrollments",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: enrollmentListTableColumns,
          searchFunc: EnrollmentQueries.getCourseEnrollmentList,
          searchParams: { cart_item__cart: order.id },
          rowKey: 'id',
          refreshEventName: "REFRESH_STUDENT_TAB",
        }
      },
      helpKey: "studentTab"
    },
    {
      tabTitle: "Seat Blocks",
      tabType: "table",
      tabMeta: {
        tableProps: {
          ...getSeatBlockListTableColumns(),
          pagination: false,
          searchParams: { cart_item__cart: order.id },
          rowKey: 'id',
          refreshEventName: "REFRESH_SEAT_BLOCK_TAB",
        }
      },
      helpKey: "seatBlockTab"
    },
    {
      tabTitle: "Log",
      tabType: "summary",
      tabMeta: {
        summary: [
          {
            contents: [
              { label: 'Enrollment Request (Campus -> ERP)', value: renderJson(order.enrollment_request) },
              { label: 'Enrollment Request Response from ERP (ERP -> Campus)', value: renderJson(order.enrollment_response) },
              { label: 'Enrollment Notification (ERP -> Campus)', value: renderJson(order.enrollment_notification) },
              { label: 'Enrollment Notification Response from Campus (Campus -> ERP)', value: renderJson(order.enrollment_notification_response) },
            ]
          }
        ]
      },
      helpKey: "logTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: order.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Order Title - ${order.order_ref}`,
    tabs: tabMetas
  }
}

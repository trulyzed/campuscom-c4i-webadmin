import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { cartItemListTableColumns } from "~/TableSearchMeta/CartItem/CartItemListTableColumns"
import { renderDate, renderDateTime } from "@packages/components/lib/ResponsiveTable"
import { questionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"
import { studentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns"
import { enrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { renderJson, renderAnswer, renderLink } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { PopoverSummaryTable } from "@packages/components/lib/Popover/PopoverSummaryTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { getSeatBlockListTableColumns } from "~/TableSearchMeta/SeatBlock/SeatBlockListTableColumns"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: `Order: ${order.order_ref}`,
    contents: [
      ...[
        { label: 'Store', value: renderLink(`/administration/store/${order.store?.id}`, order.store?.name) },
        { label: 'Enrollment Date', value: order.datetime, render: renderDate },
        { label: 'Status', value: order.cart_status },
        { label: 'Extended amount', value: order.gross_amount },
        { label: 'Discount amount', value: order.total_discount },
        { label: 'Tax amount', value: order.tax_amount },
      ],
      ...order.purchaser_info.purchasing_for?.type ? [{ label: 'Purchasing for', value: order.purchaser_info.purchasing_for?.type }] : [],
      ...order.parent_order?.id ? [{ label: 'Parent Order', value: renderLink(`/storefront-data/order/${order.parent_order.id}`, order.parent_order.order_ref) }] : []
    ]
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

  const paymentSummaryMeta: IDetailsSummary = {
    summary: (order.payments as any[]).map(payment => ({
      title: `Payment: ${payment.transaction_request_id}`,
      contents: [
        { label: 'Store Payment Gateway', value: payment.store_payment_gateway?.name },
        { label: 'Amount', value: payment.amount },
        { label: 'Transaction Reference', value: payment.transaction_reference },
        { label: 'Status', value: payment.status },
        { label: 'Account Number', value: payment.account_number },
        { label: 'Active Status', value: payment.active_status },
        { label: 'Auth Code', value: payment.auth_code },
        { label: 'Bank', value: payment.bank },
        { label: 'Card Number', value: payment.card_number },
        { label: 'Card Type', value: payment.card_type },
        { label: 'Currency Code', value: payment.currency_code },
        { label: 'Customer IP', value: payment.customer_ip },
        { label: 'Payment Type', value: payment.payment_type },
        { label: 'Reason Code', value: payment.reason_code },
        { label: 'Reason Description', value: payment.reason_description },
        { label: 'Transaction Time', value: payment.transaction_time, render: renderDateTime },
      ]
    }))
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "orderSummaryTab"
    },
    {
      tabTitle: "Order Items",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: cartItemListTableColumns,
          dataSource: order.cart_details,
          rowKey: 'id',
          refreshEventName: "REFRESH_ORDER_ITEM_TAB",
        }
      },
      helpKey: "orderItemTab"
    },
    {
      tabTitle: "Payment",
      tabType: "summary",
      multipleTabMetas: [
        {
          tabTitle: 'All Payments',
          tabType: 'summary',
          tabMeta: paymentSummaryMeta
        },
        {
          tabTitle: 'Payment Questions',
          tabType: 'table',
          tabMeta: {
            tableProps: {
              pagination: false,
              columns: [
                questionListTableColumns[0],
                {
                  title: "Answer",
                  dataIndex: 'answer',
                  render: renderAnswer,
                  sorter: (a: any, b: any) => a.answer - b.answer
                },
              ],
              dataSource: processQuestions(order.agreement_details),
              rowKey: 'question',
              refreshEventName: "REFRESH_QUESTIONNAIRE_TAB",
            }
          }
        },
      ],
      helpKey: "paymentTab",
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
              title: "Action",
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
          refreshEventName: "REFRESH_ENROLLMENT_LIST",
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

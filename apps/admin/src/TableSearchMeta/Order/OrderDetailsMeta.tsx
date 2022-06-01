import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { cartItemListTableColumns } from "~/TableSearchMeta/CartItem/CartItemListTableColumns"
import { renderDate, renderDateTime, renderLink } from "~/packages/components/ResponsiveTable"
import { questionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns"
import { processQuestions } from "~/packages/services/Api/Queries/AdminQueries/Proxy/Questions"
import { studentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns"
import { enrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { EnrollmentQueries } from "~/packages/services/Api/Queries/AdminQueries/Enrollments"
import { renderJson, renderAnswer } from "~/packages/components/ResponsiveTable/tableUtils"
import { SummaryTablePopover } from "~/packages/components/Popover/SummaryTablePopover"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: `Order: ${order.order_ref}`,
    contents: [
      { label: 'Store', value: order.store, render: (text: any) => text.name },
      { label: 'Student', value: renderLink(`/storefront-data/student/${order.profile.id}`, `${order.profile.first_name} ${order.profile.last_name}`), },
      { label: 'Enrollment Date', value: order.datetime, render: renderDate },
      { label: 'Status', value: order.cart_status },
      { label: 'Extended amount', value: order.gross_amount },
      { label: 'Discount amount', value: order.total_discount },
      { label: 'Tax amount', value: order.tax_amount },
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
          ...order.purchaser_info.company ? [{ label: 'Company', value: order.purchaser_info.company?.company_name }] : []
        ],
      },
      {
        title: 'Additional Information',
        contents: processQuestions((order.purchaser_info?.extra_info || []) as any[]).map(i => ({
          label: i.question,
          value: i.answer
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
              title: "",
              dataIndex: "extra_info",
              render: (value) => (
                <SummaryTablePopover card={{
                  title: 'Profile Questions',
                  contents: (processQuestions((value || []) as any[])).map((i: any) => ({
                    label: i.question,
                    value: i.answer
                  }))
                }} />
              ),
            },
          ],
          dataSource: order.student_details,
          rowKey: 'product_id',
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
  ]

  return {
    pageTitle: `Order Title - ${order.order_ref}`,
    tabs: tabMetas
  }
}

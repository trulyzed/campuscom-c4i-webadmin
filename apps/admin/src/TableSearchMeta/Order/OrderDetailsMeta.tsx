import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { getCartItemListTableColumns } from "~/TableSearchMeta/CartItem/CartItemListTableColumns"
import { renderDate, renderDateTime } from "~/packages/components/ResponsiveTable"
import { questionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns"
import { processQuestions } from "~/packages/services/Api/Queries/AdminQueries/Proxy/Questions"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: `Order: ${order.order_ref}`,
    contents: [
      { label: 'Store', value: order.store, render: (text: any) => text.name },
      { label: 'Student', value: order.profile, render: (text: any) => `${text.first_name} ${text.last_name}` },
      { label: 'Enrollment Date', value: order.datetime, render: renderDate },
      { label: 'Status', value: order.cart_status },
      { label: 'Extended amount', value: order.gross_amount },
      { label: 'Discount amount', value: order.total_discount },
      { label: 'Tax amount', value: order.tax_amount },
    ]
  }

  const purchaserInfo: CardContainer = {
    title: 'Purchaser',
    contents: [
      { label: 'First Name', value: order.purchaser_info.first_name, },
      { label: 'Last Name', value: order.purchaser_info.last_name, },
      { label: 'Email', value: order.purchaser_info.primary_email },
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
  console.log(processQuestions(order.agreement_details))

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
          ...getCartItemListTableColumns(order.id),
          searchParams: { id: order.id },
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
              columns: questionListTableColumns,
              dataSource: processQuestions(order.agreement_details),
              refreshEventName: "REFRESH_QUESTIONNAIRE_TAB",
            }
          }
        },
      ],
      helpKey: "paymentTab",
    },
  ]

  return {
    pageTitle: `Order Title - ${order.order_ref}`,
    tabs: tabMetas
  }
}

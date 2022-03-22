import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"

export const getPaymentDetailsMeta = (payment: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Payment: ${payment.transaction_request_id}`,
    contents: [
      { label: 'Store', value: payment.store.name, render: (text: any) => text },
      { label: 'Order ID', value: payment.cart.order_ref },
      { label: 'Product', value: payment.product.title, render: (text: any) => text },
      { label: 'Store Payment Gateway', value: payment.store_payment_gateway?.name, render: (text: any) => text },
      { label: 'Amount', value: payment.amount },
      { label: 'Transaction Reference', value: payment.transaction_reference },
      { label: 'Status', value: payment.status },
      { label: 'Student', value: payment.profile, render: (text: any) => `${text.first_name} ${text.last_name}` },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "paymentSummaryTab"
    },
  ]

  return {
    pageTitle: `Payment Title - ${payment.transaction_request_id}`,
    tabs: tabMetas
  }
}

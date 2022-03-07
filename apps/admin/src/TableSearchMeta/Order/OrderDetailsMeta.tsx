import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: "Basic Info",
    contents: [
      { label: 'Store', value: order.store, render: (text: any) => text.name },
      { label: 'Student', value: order.profile, render: (text: any) => `${text.first_name} ${text.last_name}` },
      { label: 'Enrollment Date', value: order.datetime },
      { label: 'Status', value: order.cart_status },
      { label: 'Extended amount', value: order.gross_amount },
      { label: 'Discount amount', value: order.total_discount },
      { label: 'Tax amount', value: order.tax_amount },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [basicInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "orderSummaryTab"
    },
  ]

  return {
    pageTitle: `Order Title - ${order.title}`,
    tabs: tabMetas
  }
}

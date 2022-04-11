import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"

export const getPaymentGatewayDetailsMeta = (paymentGateway: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `PaymentGateway: ${paymentGateway.name}`,
    contents: [
      { label: 'Provider Type', value: paymentGateway.provider_type, },
      { label: 'Name', value: paymentGateway.name, },
      { label: 'Slug', value: paymentGateway.slug, },
      { label: 'Is Sandboxed?', value: paymentGateway.is_sandboxed, render: renderBoolean },
      { label: 'Is School Provider?', value: paymentGateway.is_school_provider, },
      { label: 'Configuration', value: paymentGateway.configuration, render: (text: any) => JSON.stringify(text) },
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
      helpKey: "paymentGatewaySummaryTab"
    },
  ]

  return {
    pageTitle: `PaymentGateway Title - ${paymentGateway.name}`,
    tabs: tabMetas
  }
}

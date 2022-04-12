import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"

export const getPaymentGatewayConfigDetailsMeta = (paymentGateway: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Payment Gateway Config: ${paymentGateway.name}`,
    contents: [
      { label: 'Name', value: paymentGateway.name, },
      { label: 'Configuration', value: paymentGateway.configuration, render: renderJson },
      { label: 'Is Sandbox', value: paymentGateway.is_sandbox, render: renderBoolean },
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
    pageTitle: `Payment Gateway Config Title - ${paymentGateway.name}`,
    tabs: tabMetas
  }
}

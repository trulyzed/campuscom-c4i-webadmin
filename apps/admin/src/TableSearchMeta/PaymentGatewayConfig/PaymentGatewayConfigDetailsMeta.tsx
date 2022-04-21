import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"

export const getPaymentGatewayConfigDetailsMeta = (paymentGatewayConfig: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Payment Gateway Config: ${paymentGatewayConfig.name}`,
    contents: [
      { label: 'Name', value: paymentGatewayConfig.name, },
      { label: 'Configuration', value: paymentGatewayConfig.configuration, render: renderJson },
      { label: 'Is Sandbox', value: paymentGatewayConfig.is_sandbox, render: renderBoolean },
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
      helpKey: "paymentGatewayConfigSummaryTab"
    },
  ]

  return {
    pageTitle: `Payment Gateway Config Title - ${paymentGatewayConfig.name}`,
    tabs: tabMetas
  }
}

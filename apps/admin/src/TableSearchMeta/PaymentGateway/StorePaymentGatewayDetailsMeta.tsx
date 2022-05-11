import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"

export const getStorePaymentGatewayDetailsMeta = (storePaymentGateway: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Store Payment Gateway: ${storePaymentGateway.name}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${storePaymentGateway.store.id}`, storePaymentGateway.store.name), },
      { label: 'Name', value: storePaymentGateway.name, },
      { label: 'Payment Gateway', value: renderLink(`/configuration/payment-gateway/${storePaymentGateway.payment_gateway.id}`, storePaymentGateway.payment_gateway.name), },
      { label: 'Payment Gateway Config', value: renderLink(`/configuration/payment-gateway-config/${storePaymentGateway.payment_gateway_config.id}`, storePaymentGateway.payment_gateway_config.name), },
      { label: 'Branding', value: storePaymentGateway.branding, render: renderJson },
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
    pageTitle: `Store Payment Gateway Title - ${storePaymentGateway.name}`,
    tabs: tabMetas
  }
}

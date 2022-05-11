import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { SummaryTablePopover } from "~/packages/components/Popover/SummaryTablePopover"

export const getStorePaymentGatewayDetailsMeta = (storePaymentGateway: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Store Payment Gateway: ${storePaymentGateway.name}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${storePaymentGateway.store.id}`, storePaymentGateway.store.name), },
      { label: 'Name', value: storePaymentGateway.name, },
      { label: 'Payment Gateway', value: renderLink(`/configuration/payment-gateway/${storePaymentGateway.payment_gateway.id}`, storePaymentGateway.payment_gateway.name), },
      { label: 'Payment Gateway Config', value: renderLink(`/configuration/payment-gateway-config/${storePaymentGateway.payment_gateway_config.id}`, storePaymentGateway.payment_gateway_config.name), },
      {
        label: 'Branding', render: () => (
          <SummaryTablePopover card={{
            title: 'Branding Configuration',
            contents: [
              {
                label: 'Text',
                value: storePaymentGateway.branding?.text
              },
              {
                label: 'Logo',
                value: storePaymentGateway.branding?.logo ? renderLink(storePaymentGateway.branding?.logo, storePaymentGateway.branding?.logo) : undefined,
              }
            ]
          }} />
        ),
      },
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

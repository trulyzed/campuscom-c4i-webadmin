import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { PopoverSummaryTable } from "@packages/components/lib/Popover/PopoverSummaryTable"
import { renderThumb } from "@packages/components/lib/ResponsiveTable/tableUtils"

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
          <PopoverSummaryTable card={{
            title: 'Branding Configuration',
            contents: [
              {
                label: 'Text',
                value: storePaymentGateway.branding?.text
              },
              {
                label: 'Logo',
                value: storePaymentGateway.branding?.logo ? renderThumb(storePaymentGateway.branding?.logo, storePaymentGateway.branding?.logo) : undefined,
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

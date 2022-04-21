import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean, renderDateTime } from "~/packages/components/ResponsiveTable"

export const getPaymentGatewayDetailsMeta = (paymentGateway: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Payment Gateway: ${paymentGateway.name}`,
    contents: [
      { label: 'Name', value: paymentGateway.name, },
      { label: 'SDK Version', value: paymentGateway.sdk_version, },
      { label: 'Last Update Date', value: paymentGateway.last_update_date, render: renderDateTime },
      { label: 'Is Active', value: paymentGateway.is_active, render: renderBoolean },
      { label: 'Source Library Path', value: paymentGateway.source_library_path, },
      { label: 'Class Name', value: paymentGateway.class_name, },
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
    pageTitle: `Payment Gateway Title - ${paymentGateway.name}`,
    tabs: tabMetas
  }
}

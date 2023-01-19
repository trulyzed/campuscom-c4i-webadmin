import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { renderDate, renderJson, renderLink } from "@packages/components/lib/ResponsiveTable"

export const getPaymentLogDetailsMeta = (paymentLog: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Payment Log: ${paymentLog.summary}`,
    contents: [
      { label: 'Order', value: renderLink(`/storefront-data/order/${paymentLog.cart.id}`, paymentLog.cart.order_ref) },
      { label: 'Summary', value: paymentLog.summary },
      { label: 'Date', value: paymentLog.created_at, render: renderDate },
      { label: 'Data', value: paymentLog.data, render: renderJson },
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
      helpKey: "companySummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: paymentLog.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Payment Log Title - ${paymentLog.summary}`,
    tabs: tabMetas
  }
}

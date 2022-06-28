import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderDateTime } from "~/packages/components/ResponsiveTable"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"

export const getAuditTrailDetailsMeta = (auditTrail: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Audit Trail: ${auditTrail.ref_id}`,
    contents: [
      { label: "Narration", value: auditTrail.narration },
      { label: "Source", value: auditTrail.source },
      { label: "Time", value: auditTrail.when, render: renderDateTime },
      { label: "User", value: auditTrail.user, render: renderJson },
      { label: "Request", value: auditTrail.request, render: renderJson },
      { label: "Response", value: auditTrail.response, render: renderJson },
      { label: "Note", value: auditTrail.note, render: renderJson },
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
      helpKey: "auditTrailSummaryTab"
    },
  ]

  return {
    pageTitle: `Audit Trail Title - ${auditTrail.ref_id}`,
    tabs: tabMetas
  }
}

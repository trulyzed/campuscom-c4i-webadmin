import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { renderJson, renderLink } from "@packages/components/lib/ResponsiveTable"

export const getERPLogDetailsMeta = (ERPLog: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `ERP Log: ${ERPLog.id}`,
    contents: [
      { label: 'Course Provider', value: renderLink(`/administration/course-provider/${ERPLog.course_provider.id}`, ERPLog.course_provider.name) },
      { label: 'Type', value: ERPLog.type },
      { label: 'ERP', value: ERPLog.ERP },
      { label: 'Status Code', value: ERPLog.status_code },
      { label: 'Action', value: ERPLog.action },
      { label: 'Date', value: ERPLog.created_at },
      { label: 'Data', value: ERPLog.data, render: renderJson },
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
          searchParams: { changes_in__id: ERPLog.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `ERP Log Title - ${ERPLog.id}`,
    tabs: tabMetas
  }
}

import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { renderDate, renderThumb } from "@packages/components/lib/ResponsiveTable/tableUtils"

export const getContactDetailsMeta = (contact: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Contact: ${contact.name}`,
    contents: [
      { label: 'First Name', value: contact.first_name, render: (text: any) => text },
      { label: 'Last Name', value: contact.last_name },
      { label: 'Date of Birth', value: contact.date_of_birth, render: renderDate },
      { label: 'Profile Picture', value: renderThumb(contact.profile_picture_uri, "Profiles's image") },
      { label: 'Primary Email', value: contact.primary_email, render: (text: any) => text },
      { label: 'Primary Contact Number', value: contact.primary_contact_number, render: (text: any) => text },
      { label: 'Terms Accepted', value: contact.terms_accepted, render: (text: any) => text },
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
          searchParams: { changes_in__id: contact.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Contact Title - ${contact.name}`,
    tabs: tabMetas
  }
}

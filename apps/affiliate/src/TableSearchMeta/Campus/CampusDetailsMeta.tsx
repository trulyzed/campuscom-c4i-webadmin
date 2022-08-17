import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CampusFormMeta } from "~/Component/Feature/Campuses/FormMeta/CampusFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { notification } from "antd"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CampusQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Campuses"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getCampusDetailsMeta = (campus: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CampusQueries.update({ ...data, params: { id: campus.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CampusQueries.update])

  const summaryInfo: CardContainer = {
    title: `Campus: ${campus.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Campus`}
        formMeta={CampusFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...campus, provider: campus.provider.id }}
        defaultFormValue={{ campusId: campus.id }}
        buttonLabel={`Update Campus`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: campus.name, render: (text: any) => text },
      { label: 'Code', value: campus.code },
      { label: 'Provider', value: renderLink(`/administration/course-provider/${campus.provider.id}`, campus.provider.name), },
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
      helpKey: "campusSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: campus.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Campus Title - ${campus.name}`,
    tabs: tabMetas
  }
}

import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { OrganizationTypeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/OrganizationTypes"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getOrganizationTypeFormMeta } from "~/Component/Feature/OrganizationTypes/FormMeta/OrganizationTypeFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { renderHtml } from "@packages/components/lib/ResponsiveTable"

export const getOrganizationTypeDetailsMeta = (organization_type: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => OrganizationTypeQueries.update({ ...data, params: { id: organization_type.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [OrganizationTypeQueries.update])

  const summaryInfo: CardContainer = {
    title: `Organization Type: ${organization_type.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Organization Type`}
        formMeta={getOrganizationTypeFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={organization_type}
        buttonLabel={`Update Organization Type`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: organization_type.name },
      { label: 'Description', value: organization_type.description, render: renderHtml },
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
      helpKey: "summaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: organization_type.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Organization Type Title - ${organization_type.name}`,
    tabs: tabMetas
  }
}

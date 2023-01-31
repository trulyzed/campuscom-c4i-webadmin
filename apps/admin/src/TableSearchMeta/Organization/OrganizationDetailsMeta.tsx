import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getOrganizationFormMeta } from "~/Component/Feature/Organizations/FormMeta/OrganizationFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderHtml, renderLink } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getOrganizationDetailsMeta = (organization: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => OrganizationQueries.update({ ...data, params: { id: organization.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [OrganizationQueries.update])

  const summaryInfo: CardContainer = {
    title: `Company: ${organization.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Company`}
        formMeta={getOrganizationFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={organization}
        buttonLabel={`Update Company`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: organization.name },
      { label: 'Short Name', value: organization.short_name },
      { label: 'Organization Type', value: renderLink(`/administration/organization-type/${organization.organization_type.id}`, organization.organization_type.name) },
      { label: 'Parent Organization', value: organization.parent_organization ? renderLink(`/administration/organization/${organization.parent_organization.id}`, organization.parent_organization.name) : null },
      { label: 'Description', value: organization.description, render: renderHtml },
      { label: 'Address', value: organization.address },
      { label: 'Email', value: organization.email },
      { label: 'Contact', value: organization.contact_no },
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
      helpKey: "organizationSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: organization.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Company Title - ${organization.name}`,
    tabs: tabMetas
  }
}

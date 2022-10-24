import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getCompanyFormMeta } from "~/Component/Feature/Companies/FormMeta/CompanyFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getCompanyDetailsMeta = (company: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CompanyQueries.update({ ...data, params: { id: company.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CompanyQueries.update])

  const summaryInfo: CardContainer = {
    title: `Organization: ${company.company_name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Organization`}
        formMeta={getCompanyFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...company, store: company.store.id }}
        buttonLabel={`Update Organization`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        tooltip="Delete Organization"
        type="delete"
        redirectTo="/administration/organization"
        queryService={QueryConstructor(() => CompanyQueries.delete({ data: { ids: [company.id] } }), [CompanyQueries.delete])}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${company.store.id}`, company.store.name) },
      { label: 'Organization', value: company.company_name },
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
          searchParams: { changes_in__id: company.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Organization Title - ${company.company_name}`,
    tabs: tabMetas
  }
}

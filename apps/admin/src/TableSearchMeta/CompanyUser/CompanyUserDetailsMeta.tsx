import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CompanyUserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CompanyUsers"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { getCompanyUserFormMeta } from "~/Component/Feature/CompanyUsers/FormMeta/CompanyUserFormMeta"
import { renderBoolean, } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { List } from "@packages/components/lib/DisplayFormatter/List"

export const getCompanyUserDetailsMeta = (companyUser: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CompanyUserQueries.update({ ...data, params: { id: companyUser.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CompanyUserQueries.update])

  const summaryInfo: CardContainer = {
    title: `Company: ${companyUser.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Affiliate User`}
        formMeta={getCompanyUserFormMeta().filter(i => i.fieldName !== "password")}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...companyUser, companies: companyUser.db_context.Company, custom_roles: companyUser.custom_roles.map((i: any) => i.id) }}
        buttonLabel={`Update Affiliate User`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'First name', value: companyUser.first_name, },
      { label: 'Last name', value: companyUser.last_name, },
      { label: 'Username', value: companyUser.username, },
      { label: 'Email', value: companyUser.email, },
      { label: 'Primary contact number', value: companyUser.primary_contact_number, },
      { label: 'Roles', value: companyUser.custom_roles, render: () => <List showInTags data={companyUser.custom_roles.map((i: any) => i.name)} /> },
      //{ label: 'Companies', value: companyUser.companies, render: () => <List data={companyUser.companies.map((i: any) => i.name)} /> },
      { label: 'Two-factor authentication enabled', value: companyUser.mfa_enabled, render: renderBoolean },
      { label: 'Is active', value: companyUser.is_active, render: renderBoolean },
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
      helpKey: "companyUserSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: companyUser.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Affiliate User Title - ${companyUser.name}`,
    tabs: tabMetas
  }
}

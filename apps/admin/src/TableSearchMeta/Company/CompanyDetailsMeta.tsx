import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CompanyFormMeta } from "~/Component/Feature/Companies/FormMeta/CompanyFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { getCreateUserFormMeta } from "~/Component/Feature/Companies/FormMeta/CreateUserFormMeta"

export const getCompanyDetailsMeta = (company: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CompanyQueries.update({ ...data, params: { id: company.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CompanyQueries.update])

  const createUser = QueryConstructor(((data) => CompanyQueries.createUser({ ...data, params: { id: company.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [CompanyQueries.createUser])

  const summaryInfo: CardContainer = {
    title: `Company: ${company.company_name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Company`}
        formMeta={CompanyFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...company, store: company.store.id }}
        buttonLabel={`Update Company`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        tooltip="Delete Company"
        type="delete"
        redirectTo="/administration/company"
        queryService={QueryConstructor(() => CompanyQueries.delete({ data: { ids: [company.id] } }), [CompanyQueries.delete])}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${company.store.id}`, company.store.name) },
      { label: 'Company', value: company.company_name },
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
      tabTitle: "Users",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Name",
              dataIndex: "name",
              render: (text: any) => text
            },
          ],
          searchFunc: CompanyQueries.getUserList,
          searchParams: { company: company.id },
          refreshEventName: "REFRESH_USERS_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add User`}
              formMeta={getCreateUserFormMeta()}
              formSubmitApi={createUser}
              buttonLabel={`Add User`}
              iconType="create"
              refreshEventName={'REFRESH_USERS_TAB'}
            />
          ]
        }
      },
      helpKey: "usersTab"
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
    pageTitle: `Company Title - ${company.company_name}`,
    tabs: tabMetas
  }
}

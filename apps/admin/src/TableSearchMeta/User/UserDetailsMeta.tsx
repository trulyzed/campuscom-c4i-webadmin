import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { UserFormMeta } from "~/Component/Feature/Users/FormMeta/UserFormMeta"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { UserQueries } from "~/packages/services/Api/Queries/AdminQueries/Users"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"

export const getUserDetailsMeta = (user: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => UserQueries.update({ ...data, params: { id: user.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [UserQueries.update])

  const summaryInfo: CardContainer = {
    title: `User: ${user.first_name} ${user.last_name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update User`}
        formMeta={UserFormMeta.filter(i => i.fieldName !== "password")}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...user, custom_roles: user.custom_roles.map((i: any) => i.id), }}
        defaultFormValue={{ userId: user.id }}
        buttonLabel={`Update User`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
    ],
    contents: [
      { label: 'First name', value: user.first_name, },
      { label: 'Last name', value: user.last_name, },
      { label: 'Username', value: user.username, },
      { label: 'Email', value: user.email, },
      { label: 'Primary contact number', value: user.primary_contact_number, },
      { label: 'Roles', value: user.custom_roles, render: (text: any) => ((text || []) as any[]).map(i => i.name).join(', ') },
      { label: 'DB context', value: user.db_context, render: renderJson },
      { label: 'Is Scope Disabled', value: user.is_scope_disabled, render: renderBoolean },
      { label: 'Secret Key', value: user.secret_key },
      { label: 'Two-factor authentication enabled', value: user.mfa_enabled, render: renderBoolean },
      { label: 'Is active', value: user.is_active, render: renderBoolean },
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
      helpKey: "userSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { user__id: user.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `User Title - ${user.first_name} ${user.last_name}`,
    tabs: tabMetas
  }
}

import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderBoolean } from "@packages/components/lib/ResponsiveTable"
import { renderJson } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getUserFormMeta } from "~/Component/Feature/Users/FormMeta/UserFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { UserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Users"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { getResetPasswordFormMeta } from "~/Component/Feature/Users/FormMeta/ResetPasswordFormMeta"

export const getUserDetailsMeta = (user: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => UserQueries.update({ ...data, params: { id: user.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [UserQueries.update])

  const resetPassword = QueryConstructor(((data) => UserQueries.resetPassword( {...data, data: { ...data?.data, user: user.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: "Password Reset Successfully" })
    }
    return resp
  })), [UserQueries.resetPassword])

  const disableMFA = QueryConstructor((() => UserQueries.update({ data: { mfa_enabled: false }, params: { id: user.id } }).then(resp => {
    if (resp.success) {
      notification.warning({ message: "Two-factor authentication disabled" })
    }
    return resp
  })), [UserQueries.update])

  const summaryInfo: CardContainer = {
    title: `User: ${user.first_name} ${user.last_name}`,
    cardActions: [
      ...user.mfa_enabled ? [
        <ContextAction
          tooltip="Disable Two-factor authentication"
          iconColor="warning"
          type="mfa"
          queryService={disableMFA}
          refreshEventName={REFRESH_PAGE} />
      ] : [],
      <MetaDrivenFormModalOpenButton
        formTitle={`Reset Password`}
        formMeta={getResetPasswordFormMeta()}
        formSubmitApi={resetPassword}
        buttonLabel={`Reset Password`}
        iconType="changePassword"
        refreshEventName={REFRESH_PAGE}
      />,
      <MetaDrivenFormModalOpenButton
        formTitle={`Update User`}
        formMeta={getUserFormMeta().filter(i => i.fieldName !== "password")}
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

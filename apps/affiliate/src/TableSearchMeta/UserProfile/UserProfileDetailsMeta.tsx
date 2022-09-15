import React from "react"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { AuthQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Auth"
import { getChangePasswordFormMeta } from "~/Component/Feature/AccountSettings/ChangePassword"
import { notification } from "antd"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { getEnableMFAFormMeta } from "~/Component/Feature/AccountSettings/EnableMFA"
import { getUser, setLoginInfo } from "@packages/services/lib/Api/utils/TokenStore"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { renderBoolean } from "@packages/components/lib/ResponsiveTable"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getUserProfileMeta = (userInfo: { [key: string]: any }): IDetailsMeta => {
  const changePassword = QueryConstructor(((data) => AuthQueries.changePassword({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [AuthQueries.changePassword])

  const enableMFA = QueryConstructor(((data) => AuthQueries.enableMFA({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: "2FA enabled" })
      setLoginInfo({ user: { ...getUser() as IUser, mfa_enabled: true } })
    }
    return resp
  })), [AuthQueries.enableMFA])

  const getMFAQueryData = QueryConstructor(((data) => AuthQueries.getMFA({ ...data }).then(resp => resp.success ? ({
    ...resp,
    data: { ...resp.data, qr_code: resp.data.uri }
  }) : resp)), [AuthQueries.getMFA])

  const disableMFA = QueryConstructor(((data) => AuthQueries.disableMFA({ ...data }).then(resp => {
    if (resp.success) {
      notification.warning({ message: "2FA disabled" })
      setLoginInfo({ user: { ...getUser() as IUser, mfa_enabled: false } })
    }
    return resp
  })), [AuthQueries.disableMFA])


  const tabMetas: IDetailsTabMeta[] = []
  const personalInfo: CardContainer = {
    title: userInfo.fullname,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Change Password`}
        formMeta={getChangePasswordFormMeta()}
        formSubmitApi={changePassword}
        buttonLabel={`Change Password`}
        iconType="changePassword"
        refreshEventName={REFRESH_PAGE}
      />,
      ...!userInfo.mfa_enabled ? [<MetaDrivenFormModalOpenButton
        formTitle={`Enable 2FA`}
        formMeta={getEnableMFAFormMeta()}
        dataQueryApi={getMFAQueryData}
        formSubmitApi={enableMFA}
        buttonLabel={`Enable 2FA`}
        iconType="mfa"
        refreshEventName={REFRESH_PAGE}
        isVertical
      />] : [],
      ...userInfo.mfa_enabled ? [
        <ContextAction
          tooltip="Disable 2FA"
          iconColor="warning"
          type="mfa"
          queryService={disableMFA}
          refreshEventName={REFRESH_PAGE} />
      ] : []
    ],
    contents: [
      { label: "First Name", value: userInfo.first_name, },
      { label: "Last Name", value: userInfo.last_name, },
      { label: "Email", value: userInfo.email, },
      { label: "2FA Enabled", value: userInfo.mfa_enabled, render: renderBoolean },
    ]
  }

  const demographySummaryMeta: IDetailsSummary = {
    summary: [{ groupedContents: [personalInfo] }]
  }
  tabMetas.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: demographySummaryMeta,
    helpKey: "personDemographicTab"
  })

  return { pageTitle: "User Profile", tabs: tabMetas }
}

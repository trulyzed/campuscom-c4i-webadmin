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
import { renderBoolean } from "@packages/components/lib/ResponsiveTable"
import { BalanceInfo } from "~/Component/Feature/BalanceInfo/BalanceInfo"

export const getUserProfileMeta = (userInfo: { [key: string]: any }): IDetailsMeta => {
  const changePassword = QueryConstructor(((data) => AuthQueries.changePassword({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [AuthQueries.changePassword])

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
    ],
    contents: [
      { label: "First Name", value: userInfo.first_name, },
      { label: "Last Name", value: userInfo.last_name, },
      { label: "Email", value: userInfo.email, },
      { label: "Two-factor Authentication Enabled", value: userInfo.mfa_enabled, render: renderBoolean },
    ]
  }

  const balanceInfo: CardContainer = {
    title: "Balance",
    Component: BalanceInfo,
    contents: []
  }

  const demographySummaryMeta: IDetailsSummary = {
    summary: [{ groupedContents: [personalInfo, balanceInfo] }]
  }
  tabMetas.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: demographySummaryMeta,
    helpKey: "personDemographicTab"
  })

  return { pageTitle: "User Profile", tabs: tabMetas }
}

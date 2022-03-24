import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"

export const getUserDetailsMeta = (user: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `User: ${user.first_name} ${user.last_name}`,
    contents: [
      { label: 'First name', value: user.first_name, },
      { label: 'Last name', value: user.last_name, },
      { label: 'Username', value: user.username, },
      { label: 'Email', value: user.email, },
      { label: 'Primary contact number', value: user.primary_contact_number, },
      { label: 'Roles', value: user.custom_roles, render: (text: any) => ((text || []) as any[]).map(i => i.name).join(', ') },
      { label: 'DB context', value: user.db_context, render: (text: any) => JSON.stringify(text) },
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
  ]

  return {
    pageTitle: `User Title - ${user.first_name} ${user.last_name}`,
    tabs: tabMetas
  }
}

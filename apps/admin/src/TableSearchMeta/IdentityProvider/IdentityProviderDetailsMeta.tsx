import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"

export const getIdentityProviderDetailsMeta = (identityProvider: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `IdentityProvider: ${identityProvider.name}`,
    contents: [
      { label: 'Provider Type', value: identityProvider.provider_type, },
      { label: 'Name', value: identityProvider.name, },
      { label: 'Slug', value: identityProvider.slug, },
      { label: 'Is Sandboxed?', value: identityProvider.is_sandboxed, render: renderBoolean },
      { label: 'Is School Provider?', value: identityProvider.is_school_provider, },
      { label: 'Configuration', value: identityProvider.configuration, render: renderJson },
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
      helpKey: "identityProviderSummaryTab"
    },
  ]

  return {
    pageTitle: `IdentityProvider Title - ${identityProvider.name}`,
    tabs: tabMetas
  }
}

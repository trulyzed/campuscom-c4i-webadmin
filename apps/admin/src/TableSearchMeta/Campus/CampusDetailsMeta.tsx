import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"

export const getCampusDetailsMeta = (campus: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Campus: ${campus.name}`,
    contents: [
      { label: 'Name', value: campus.name, render: (text: any) => text },
      { label: 'Code', value: campus.code },
      { label: 'Provider', value: renderLink(`/administration/course-provider/${campus.provider.id}`, campus.provider.name), },
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
      helpKey: "campusSummaryTab"
    },
  ]

  return {
    pageTitle: `Campus Title - ${campus.name}`,
    tabs: tabMetas
  }
}

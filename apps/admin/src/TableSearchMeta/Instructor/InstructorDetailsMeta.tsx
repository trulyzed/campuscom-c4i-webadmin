import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"

export const getInstructorDetailsMeta = (instructor: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Instructor: ${instructor.name}`,
    contents: [
      { label: 'Name', value: instructor.name, },
      { label: 'Provider', value: renderLink(`/administration/course-provider/${instructor.provider.id}`, instructor.provider.name) },
      { label: 'Image', value: instructor.image?.url },
      { label: 'Short bio', value: instructor.short_bio, },
      { label: 'Detail bio', value: instructor.detail_bio, },
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
      helpKey: "instructorSummaryTab"
    },
  ]

  return {
    pageTitle: `Instructor Title - ${instructor.name}`,
    tabs: tabMetas
  }
}


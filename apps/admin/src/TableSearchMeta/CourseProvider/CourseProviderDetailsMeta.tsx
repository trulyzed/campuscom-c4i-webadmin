import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderHtml, renderThumb } from "~/packages/components/ResponsiveTable/tableUtils"

export const getCourseProviderDetailsMeta = (courseProvider: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Course Provider: ${courseProvider.name}`,
    contents: [
      { label: 'Name', value: courseProvider.name, },
      { label: 'Code', value: courseProvider.code, },
      { label: 'Summary', value: renderHtml(courseProvider.summary), },
      { label: 'Website', value: courseProvider.website_url, },
      { label: 'Description', value: renderHtml(courseProvider.description), },
      { label: 'Logo', value: renderThumb(courseProvider.course_provider_logo_uri, "Course Provider's logo"), },
      { label: 'Refund Email', value: courseProvider.refund_email, },
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
      helpKey: "courseProviderSummaryTab"
    },
  ]

  return {
    pageTitle: `Course Provider Title - ${courseProvider.name}`,
    tabs: tabMetas
  }
}

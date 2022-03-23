import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean, renderLink } from "~/packages/components/ResponsiveTable"

export const getPublishingDetailsMeta = (publishing: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Publishing: ${publishing.course.title}`,
    contents: [
      { label: 'Store', value: publishing.store ? renderLink(`/administration/store/${publishing.store.id}`, publishing.store.name) : undefined },
      { label: 'Course', value: renderLink(`/institute/course/${publishing.course.id}`, publishing.course.title) },
      { label: 'Enrollment Ready', value: !!publishing.enrollment_ready, render: renderBoolean },
      { label: 'Is Published', value: !!publishing.is_published, render: renderBoolean },
      { label: 'Is Featured', value: !!publishing.is_featured, render: renderBoolean },
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
      helpKey: "publishingSummaryTab"
    },
  ]

  return {
    pageTitle: `Publishing Title - ${publishing.course.title}`,
    tabs: tabMetas
  }
}

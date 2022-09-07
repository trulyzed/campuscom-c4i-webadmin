import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime } from "@packages/components/lib/ResponsiveTable"

export const getEnrollmentDetailsMeta = (enrollment: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Enrollment: ${enrollment.course.title}`,
    contents: [
      { label: 'Store', value: enrollment.store.name },
      { label: 'Course', value: enrollment.course.title },
      { label: 'Section', value: enrollment.section.name },
      { label: 'Profile', value: `${enrollment.profile.first_name} ${enrollment.profile.last_name}` },
      { label: 'Enrollment Time', value: enrollment.enrollment_time, render: renderDateTime },
      { label: 'Application Time', value: enrollment.application_time, render: renderDateTime },
      { label: 'Enrollment Status', value: enrollment.status },
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
      helpKey: "enrollmentSummaryTab"
    },
  ]

  return {
    pageTitle: `Enrollment Title - ${enrollment.course.title}`,
    tabs: tabMetas
  }
}

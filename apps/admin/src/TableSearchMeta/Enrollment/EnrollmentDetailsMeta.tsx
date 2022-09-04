import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderDateTime, renderLink } from "~/packages/components/ResponsiveTable"

export const getEnrollmentDetailsMeta = (enrollment: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Enrollment: ${enrollment.course.title}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${enrollment.store.id}`, enrollment.store.name) },
      { label: 'Course', value: renderLink(`/course-provider/course/${enrollment.course.id}`, enrollment.course.title) },
      { label: 'Section', value: renderLink(`/course-provider/section/${enrollment.section.id}`, enrollment.section.name) },
      { label: 'Profile', value: renderLink(`/storefront-data/student/${enrollment.profile.id}`, `${enrollment.profile.first_name} ${enrollment.profile.last_name}`), },
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

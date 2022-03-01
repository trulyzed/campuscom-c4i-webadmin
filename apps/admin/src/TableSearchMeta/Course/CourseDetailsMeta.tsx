import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"

export const getCourseDetailsMeta = (course: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: "Basic Info",
    contents: [
      { label: "Title", value: course.title, render: undefined },
      { label: "Code", value: course.code, render: undefined },
      { label: 'Inquiry URL', value: course.inquiry_url },
      //{ label: 'Course Provider', value: course.provider },
      { label: 'External ID', value: course.external_id },
      { label: 'External URL', value: course.external_url },
      { label: 'Slug', value: course.slug },
      { label: 'Level', value: course.level },
      { label: 'Summary', value: course.summary },
      { label: 'Description', value: course.description },
      { label: 'Learning Outcome', value: course.learning_outcome },
      { label: 'Image', value: course.course_image_uri },
      { label: 'Syllabus URL', value: course.syllabus_url },
      { label: 'Content Ready', value: course.content_ready },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [basicInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "courseSummaryTab"
    },
  ]

  return {
    pageTitle: `Course Title - ${course.title}`,
    tabs: tabMetas
  }
}

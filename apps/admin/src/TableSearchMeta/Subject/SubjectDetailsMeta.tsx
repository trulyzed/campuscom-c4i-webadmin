import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean, renderDateTime, renderLink } from "~/packages/components/ResponsiveTable"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"

export const getSubjectDetailsMeta = (subject: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Subject: ${subject.title}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${subject.store.id}`, subject.store.name) },
      { label: 'Title', value: subject.title, },
      { label: 'Description', value: subject.description },
      { label: 'Image', value: subject.image, render: (text: any) => text },
      { label: 'Start Date', value: subject.start_date, render: renderDateTime },
      { label: 'End Date', value: subject.end_date, render: renderDateTime },
      { label: 'Is Published', value: subject.is_published, render: renderBoolean },
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
      helpKey: "subjectSummaryTab"
    },
    {
      tabTitle: "Courses",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getCourseListTableColumns(),
          searchFunc: CourseQueries.getListBySubject,
          searchParams: { id: subject.id },
          refreshEventName: "REFRESH_COURSE_TAB",
        }
      },
      helpKey: "courseTab"
    },
  ]

  return {
    pageTitle: `Subject Title - ${subject.title}`,
    tabs: tabMetas
  }
}

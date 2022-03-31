import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"
import { CourseFormMeta } from "~/Component/Feature/Courses/FormMeta/CourseFormMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { renderBoolean } from "~/packages/components/ResponsiveTable"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { getSectionListTableColumns } from "~/TableSearchMeta/Section/SectionListTableColumns"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { SectionFormMeta } from "~/Component/Feature/Sections/FormMeta/SectionFormMeta"
import { SectionQueries } from "~/packages/services/Api/Queries/AdminQueries/Sections"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

export const getCourseDetailsMeta = (course: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CourseQueries.update({ ...data, params: { id: course.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [CourseQueries.update])

  const createSection = QueryConstructor(((data) => SectionQueries.create({ ...data, data: { ...data?.data, course: course.id } }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
    }
    return resp
  })), [CourseQueries.create])

  const summary: CardContainer = {
    title: course.title,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Course`}
        formMeta={CourseFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...course, provider: course.provider.id }}
        defaultFormValue={{ courseId: course.id }}
        buttonLabel={`Update Course`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: "Title", value: course.title, render: undefined },
      { label: "Code", value: course.code, render: undefined },
      { label: 'Inquiry URL', value: course.inquiry_url },
      { label: 'Course Provider', value: course.provider.name },
      { label: 'External ID', value: course.external_id },
      { label: 'External URL', value: course.external_url },
      { label: 'Slug', value: course.slug },
      { label: 'Level', value: course.level },
      { label: 'Summary', value: course.summary },
      { label: 'Description', value: course.description },
      { label: 'Learning Outcome', value: course.learning_outcome },
      { label: 'Image', value: course.course_image_uri },
      { label: 'Syllabus URL', value: course.syllabus_url },
      { label: 'Content Ready', value: course.content_ready, render: renderBoolean },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "courseSummaryTab"
    },
    {
      tabTitle: "Sections",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getSectionListTableColumns(),
          searchParams: { course__id: course.id },
          refreshEventName: "REFRESH_COURSE_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Section`}
              formMeta={SectionFormMeta}
              formSubmitApi={createSection}
              buttonLabel={`Add Section`}
              iconType="create"
              refreshEventName={'REFRESH_COURSE_LIST'}
            />
          ]
        }
      },
      helpKey: "sectionsTab"
    },
    {
      tabTitle: "Enrollments",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getEnrollmentListTableColumns(),
          searchParams: { course__id: course.id },
          refreshEventName: "REFRESH_ENROLLMENT_TAB",
        }
      },
      helpKey: "enrollmentsTab"
    },
    {
      tabTitle: "Publishing Stores",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getEnrollmentListTableColumns(),
          searchFunc: StoreQueries.getListByCoursePublishing,
          searchParams: { course__id: course.id },
          refreshEventName: "REFRESH_PUBLISHING_STORE_TAB",
        }
      },
      helpKey: "publishingStoresTab"
    },
  ]

  return {
    pageTitle: `Course Title - ${course.title}`,
    tabs: tabMetas
  }
}

import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { CourseQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Courses"
import { getCourseFormMeta } from "~/Component/Feature/Courses/FormMeta/CourseFormMeta"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { renderBoolean, renderLink } from "@packages/components/lib/ResponsiveTable"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { getSectionListTableColumns } from "~/TableSearchMeta/Section/SectionListTableColumns"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { SectionFormMeta } from "~/Component/Feature/Sections/FormMeta/SectionFormMeta"
import { SectionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Sections"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { getStoreListTableColumns } from "~/TableSearchMeta/Store/StoreListTableColumns"
import { renderActiveStatus, renderHtml, renderThumb } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { getQuestionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
import { getRegistrationQuestionTaggingFormMeta } from "~/Component/Feature/Courses/FormMeta/RegistrationQuestionTaggingFormMeta"
import { getCareerListTableColumns } from "~/TableSearchMeta/Career/CareerListTableColumns"
import { getCareerTaggingFormMeta } from "~/Component/Feature/Courses/FormMeta/CareerTaggingFormMeta"
import { CareerQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Careers"
import { getSkillListTableColumns } from "~/TableSearchMeta/Career/SkillListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getCourseDetailsMeta = (course: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CourseQueries.update({ ...data, params: { id: course.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseQueries.update])

  const createSection = QueryConstructor(((data) => SectionQueries.create({ ...data, data: { ...data?.data, course: course.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseQueries.create])

  const tagCareer = QueryConstructor(((data) => CourseQueries.tagCareer({ ...data, data: { ...data?.data }, params: { course_id: course.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseQueries.tagCareer, CareerQueries.getCareersAndSkillsByCourse])

  const tagRegistrationQuestion = QueryConstructor(((data) => CourseQueries.tagRegistrationQuestion({ ...data, data: { ...data?.data, course: course.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseQueries.tagRegistrationQuestion])


  const taggedCareersAndSkillQuery = QueryConstructor(() => {
    return CareerQueries.getCareersAndSkillsByCourse({ params: { course_id: course.id } }).then(resp => {
      return {
        ...resp,
        data: {
          ...resp.data,
          careers: resp.data.careers.map((i: any) => i.id),
          skills: resp.data.skills.map((i: any) => i.id)
        }
      }
    })
  }, [CareerQueries.getCareersAndSkillsByCourse])

  const summary: CardContainer = {
    title: course.title,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Course`}
        formMeta={getCourseFormMeta(course)}
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
      { label: 'Active Status', value: course.active_status, render: renderActiveStatus },
      { label: "Title", value: course.title, render: undefined },
      { label: "Code", value: course.code, render: undefined },
      { label: 'Inquiry URL', value: course.inquiry_url },
      { label: 'Course Provider', value: renderLink(`/administration/course-provider/${course.provider.id}`, course.provider.name) },
      { label: 'External ID', value: course.external_id },
      { label: 'External URL', value: course.external_url },
      { label: 'Slug', value: course.slug },
      { label: 'Level', value: course.level },
      { label: 'Summary', value: course.summary },
      { label: 'Description', value: renderHtml(course.description) },
      { label: 'Learning Outcome', value: renderHtml(course.learning_outcome) },
      { label: 'Image', value: renderThumb(course.course_image_uri, "Course's photo") },
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
              formTitle={`Create Section`}
              formMeta={SectionFormMeta}
              formSubmitApi={createSection}
              buttonLabel={`Create Section`}
              iconType="create"
              refreshEventName={'REFRESH_COURSE_LIST'}
            />
          ]
        }
      },
      helpKey: "sectionsTab"
    },
    {
      tabTitle: "Careers",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getCareerListTableColumns(),
          searchFunc: CareerQueries.getListByCourse,
          searchParams: { id: course.id },
          refreshEventName: "REFRESH_CAREER_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Tag Career`}
              formMeta={getCareerTaggingFormMeta()}
              formSubmitApi={tagCareer}
              buttonLabel={`Tag Career`}
              refreshEventName={'REFRESH_CAREER_LIST'}
              initialFormValueApi={taggedCareersAndSkillQuery}
            />
          ]
        }
      },
      helpKey: "careersTab"
    },
    {
      tabTitle: "Skills",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getSkillListTableColumns(),
          searchParams: { id: course.id },
          refreshEventName: "REFRESH_SKILL_LIST",
        }
      },
      helpKey: "skillsTab"
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
          ...getStoreListTableColumns(),
          columns: [
            {
              title: "Store",
              dataIndex: "store_name",
              render: (text: any, record: any) => record.store_id ? renderLink(`/administration/store/${record.store_id}`, text) : text,
              sorter: (a: any, b: any) => a.store_name - b.store_name
            },
            {
              title: "Section Name",
              dataIndex: "section_name",
              render: (text: any, record: any) => record.section_id ? renderLink(`/course-provider/section/${record.section_id}`, text) : text,
              sorter: (a: any, b: any) => a.section_name - b.section_name
            },
            {
              title: "Fee",
              dataIndex: "product_fee",
              sorter: (a: any, b: any) => a.product_fee - b.product_fee
            },
            {
              title: "Checkout URL",
              dataIndex: 'product_id',
              render: (text: any, record: any) => renderLink(`${process.env.REACT_APP_ENROLLMENT_URL}/${record.store_slug}/?guest=true&product=${text}`, `${process.env.REACT_APP_ENROLLMENT_URL}/${record.store_slug}/?guest=true&product=${text}`, false, true),
            },
          ],
          searchFunc: StoreQueries.getListByCoursePublishing,
          searchParams: { course__id: course.id },
          refreshEventName: "REFRESH_PUBLISHING_STORE_TAB",
        }
      },
      helpKey: "publishingStoresTab"
    },
    {
      tabTitle: "Registration Questions",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getQuestionListTableColumns(),
          columns: [
            {
              title: "Title",
              dataIndex: "question",
              render: (text: any, record: any) => renderLink(`/administration/question/${record.question_bank}`, text),
              sorter: (a: any, b: any) => a.title - b.title
            },
            {
              title: "Type",
              dataIndex: 'question_type',
              sorter: (a: any, b: any) => a.question_type - b.question_type
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <ContextAction
                  tooltip="Remove"
                  type="delete"
                  refreshEventName="REFRESH_REGISTRATION_QUESTION_TAB"
                  queryService={QueryConstructor(() => CourseQueries.untagRegistrationQuestion({ data: { ids: [text] } }), [CourseQueries.untagRegistrationQuestion])}
                />
              )
            },
          ],
          searchFunc: QuestionQueries.getRegistrationQuestionListByCourse,
          searchParams: { entity_id: course.id },
          refreshEventName: "REFRESH_REGISTRATION_QUESTION_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Registration Question`}
              formMeta={getRegistrationQuestionTaggingFormMeta(course.id)}
              formSubmitApi={tagRegistrationQuestion}
              buttonLabel={`Create Registration Question`}
              iconType="create"
              refreshEventName={'REFRESH_REGISTRATION_QUESTION_TAB'}
            />
          ]
        }
      },
      helpKey: "registrationQuestionsTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: course.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Course Title - ${course.title}`,
    tabs: tabMetas
  }
}

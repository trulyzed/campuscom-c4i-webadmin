import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CourseQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Courses"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { getCourseFormMeta } from "~/Component/Feature/Courses/FormMeta/CourseFormMeta"
import { getSkillListTableColumns } from "~/TableSearchMeta/Skill/SkillListTableColumns"
import { SkillQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Skills"

export const getCourseDetailsMeta = (course: { [key: string]: any }): IDetailsMeta => {
  const enroll = QueryConstructor(((data) => CourseQueries.enroll({ ...data, params: { id: course.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: "Enrolled successfully" })
    }
    return resp
  })), [CourseQueries.enroll])

  const summaryInfo: CardContainer = {
    title: `Course: ${course.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Enroll`}
        formMeta={getCourseFormMeta()}
        formSubmitApi={enroll}
        initialFormValue={{ ...course }}
        buttonLabel={`Enroll`}
        // iconType="start"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Title', value: course.title },
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
      helpKey: "courseSummaryTab"
    },
    {
      tabTitle: "Skills",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getSkillListTableColumns(),
          searchFunc: SkillQueries.getListByCourse,
          searchParams: { course: course.id },
          refreshEventName: "REFRESH_SKILL_LIST",
        }
      },
      helpKey: "skillsTab"
    },
  ]

  return {
    pageTitle: `Course Title - ${course.title}`,
    tabs: tabMetas
  }
}

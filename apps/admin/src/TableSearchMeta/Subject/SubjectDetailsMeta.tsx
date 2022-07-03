import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean, renderDateTime, renderLink } from "~/packages/components/ResponsiveTable"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { SubjectQueries } from "~/packages/services/Api/Queries/AdminQueries/Subjects"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { SubjectFormMeta } from "~/Component/Feature/Subjects/FormMeta/SubjectFormMeta"
import { renderHtml, renderThumb } from "~/packages/components/ResponsiveTable/tableUtils"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getSubjectDetailsMeta = (subject: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => SubjectQueries.update({ ...data, params: { id: subject.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [SubjectQueries.update])

  const summaryInfo: CardContainer = {
    title: `Subject: ${subject.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Subject`}
        formMeta={SubjectFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...subject, store: subject.store.id }}
        defaultFormValue={{ subjectId: subject.id }}
        buttonLabel={`Update Subject`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${subject.store.id}`, subject.store.name) },
      { label: 'Title', value: subject.title, },
      { label: 'Description', value: renderHtml(subject.description) },
      { label: 'Image', value: renderThumb(subject.image, "Subject's image") },
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
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: subject.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Subject Title - ${subject.title}`,
    tabs: tabMetas
  }
}

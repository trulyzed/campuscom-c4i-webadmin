import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean, renderLink } from "~/packages/components/ResponsiveTable"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { PublishingQueries } from "~/packages/services/Api/Queries/AdminQueries/Publishings"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { message } from "antd"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { PublishingFormMeta } from "~/Component/Feature/Publishings/FormMeta/PublishingFormMeta"
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"
import { getSubjectTaggingFormMeta } from "~/Component/Feature/Courses/FormMeta/SubjectTaggingFormMeta"
import { SubjectQueries } from "~/packages/services/Api/Queries/AdminQueries/Subjects"
import { renderActiveStatus } from "~/packages/components/ResponsiveTable/tableUtils"

export const getPublishingDetailsMeta = (publishing: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => PublishingQueries.update({ ...data, data: { ...data?.data, course: publishing.course.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [PublishingQueries.update])

  const tagSubjects = QueryConstructor(((data) => CourseQueries.tagToSubjects({ ...data, data: { ...data?.data, publishingId: publishing.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [CourseQueries.create])

  const summaryInfo: CardContainer = {
    title: `Publishing: ${publishing.course.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Publishing`}
        formMeta={PublishingFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...publishing, store: publishing.store?.id }}
        defaultFormValue={{ publishingId: publishing.id }}
        buttonLabel={`Update Publishing`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
        onFormSubmit={(data, navigator) => {
          if (!publishing.store && navigator) navigator(`/store/publishing/${data.id}`)
        }}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Active Status', value: publishing.active_status, render: renderActiveStatus },
      { label: 'Store', value: publishing.store ? renderLink(`/administration/store/${publishing.store.id}`, publishing.store.name) : undefined },
      { label: 'Course', value: renderLink(`/institute/course/${publishing.course.id}`, publishing.course.title) },
      { label: 'Enrollment Ready', value: publishing.enrollment_ready, render: renderBoolean },
      { label: 'Is Published', value: publishing.is_published, render: renderBoolean },
      { label: 'Is Featured', value: publishing.is_featured, render: renderBoolean },
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
    {
      tabTitle: "Sections",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Name",
              dataIndex: "name",
              render: (text: any, record: any) => renderLink(`/institute/section/${record.id}`, text),
              sorter: (a: any, b: any) => a.name - b.name
            },
            {
              title: "Course Provider Fee",
              dataIndex: "provider_fee",
              sorter: (a: any, b: any) => a.provider_fee - b.provider_fee
            },
            {
              title: "Section Fee",
              dataIndex: "fee",
              sorter: (a: any, b: any) => a.fee - b.fee
            },
            {
              title: "Seat Capacity",
              dataIndex: "seat_capacity",
              sorter: (a: any, b: any) => a.seat_capacity - b.seat_capacity
            },
          ],
          dataSource: publishing.sections,
          refreshEventName: "REFRESH_INVOICE_TAB",
          rowKey: 'id'
        }
      },
      helpKey: "sectionsTab"
    },
    {
      tabTitle: "Subjects",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getSubjectListTableColumns(),
          searchFunc: SubjectQueries.getListByCourse,
          searchParams: { store_course: publishing.id },
          refreshEventName: "REFRESH_SUBJECT_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Tag Subjects`}
              formMeta={getSubjectTaggingFormMeta(publishing.store.id)}
              formSubmitApi={tagSubjects}
              buttonLabel={`Tag Subjects`}
              iconType="create"
              refreshEventName={'REFRESH_SUBJECT_LIST'}
            />
          ]
        }
      },
      helpKey: "sectionsTab"
    },
  ]

  return {
    pageTitle: `Publishing Title - ${publishing.course.title}`,
    tabs: tabMetas
  }
}

import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderBoolean, renderLink } from "@packages/components/lib/ResponsiveTable"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { PublishingQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Publishings"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { notification } from "antd"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { getPublishingFormMeta } from "~/Component/Feature/Publishings/FormMeta/PublishingFormMeta"
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns"
import { CourseQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Courses"
import { getSubjectTaggingFormMeta } from "~/Component/Feature/Courses/FormMeta/SubjectTaggingFormMeta"
import { SubjectQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Subjects"
import { renderActiveStatus } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getPublishingDetailsMeta = (publishing: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => PublishingQueries.update({ ...data, data: { ...data?.data, course: publishing.course.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [PublishingQueries.update])

  const tagSubjects = QueryConstructor(((data) => CourseQueries.tagToSubjects({ ...data, data: { ...data?.data, publishingId: publishing.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseQueries.create])

  const summaryInfo: CardContainer = {
    title: `Publishing: ${publishing.course.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Publishing`}
        formMeta={getPublishingFormMeta()}
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
      { label: 'Course', value: renderLink(`/course-provider/course/${publishing.course.id}`, publishing.course.title) },
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
              render: (text: any, record: any) => renderLink(`/course-provider/section/${record.id}`, text),
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
    ...publishing.store ? [
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
                formTitle={`Add Subjects`}
                formMeta={getSubjectTaggingFormMeta(publishing.store.id)}
                initialFormValue={{ subjects: publishing.subjects }}
                formSubmitApi={tagSubjects}
                buttonLabel={`Add Subjects`}
                refreshEventName={REFRESH_PAGE}
              />
            ]
          }
        },
        helpKey: "sectionsTab"
      }
    ] as IDetailsTabMeta[] : [],
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: publishing.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Publishing Title - ${publishing.course.title}`,
    tabs: tabMetas
  }
}

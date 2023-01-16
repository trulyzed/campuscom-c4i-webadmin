import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderBoolean, renderLink } from "@packages/components/lib/ResponsiveTable"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CertificatePublishingQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CertificatePublishings"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { notification } from "antd"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { getCertificatePublishingFormMeta } from "~/Component/Feature/CertificatePublishings/FormMeta/CertificatePublishingFormMeta"
import { renderActiveStatus } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getCertificatePublishingDetailsMeta = (certificatePublishing: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor((data) => {
    return CertificatePublishingQueries.update({
      ...data,
      data: { ...data?.data, certificate: certificatePublishing.certificate.id },
    }).then(resp => {
      if (resp.success) {
        notification.success({ message: UPDATE_SUCCESSFULLY })
      }
      return resp
    })
  }, [CertificatePublishingQueries.update])

  const summaryInfo: CardContainer = {
    title: `Certificate Publishing: ${certificatePublishing.certificate.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Certificate Publishing`}
        formMeta={getCertificatePublishingFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...certificatePublishing, store: certificatePublishing.store?.id }}
        defaultFormValue={{ certificatePublishingId: certificatePublishing.id }}
        buttonLabel={`Update Certificate Publishing`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
        onFormSubmit={(data, navigator) => {
          if (!certificatePublishing.store && navigator) navigator(`/store/publishing/certificate/${data.id}`)
        }}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Active Status', value: certificatePublishing.active_status, render: renderActiveStatus },
      { label: 'Store', value: certificatePublishing.store ? renderLink(`/administration/store/${certificatePublishing.store.id}`, certificatePublishing.store.name) : undefined },
      { label: 'Certificate', value: renderLink(`/course-provider/certificate/${certificatePublishing.certificate.id}`, certificatePublishing.certificate.title) },
      { label: 'Enrollment Ready', value: certificatePublishing.enrollment_ready, render: renderBoolean },
      { label: 'Is Published', value: certificatePublishing.is_published, render: renderBoolean },
      { label: 'Is Featured', value: certificatePublishing.is_featured, render: renderBoolean },
      { label: 'Price', value: certificatePublishing.price },
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
      helpKey: "certificatePublishingSummaryTab"
    },
    {
      tabTitle: "Courses",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Name",
              dataIndex: "title",
              render: (text: any, record: any) => renderLink(`/course-provider/course/${record.id}`, text),
              sorter: (a: any, b: any) => a.title - b.title
            },
          ],
          dataSource: certificatePublishing.courses,
          refreshEventName: "REFRESH_COURSES_TAB",
          rowKey: 'id'
        }
      },
      helpKey: "coursesTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: certificatePublishing.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Certificate Publishing Title - ${certificatePublishing.certificate.title}`,
    tabs: tabMetas
  }
}

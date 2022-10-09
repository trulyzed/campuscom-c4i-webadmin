import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { InstructorQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Instructors"
import { InstructorFormMeta } from "~/Component/Feature/Instructors/FormMeta/InstructorFormMeta"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderHtml, renderThumb } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getInstructorDetailsMeta = (instructor: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => InstructorQueries.update({ ...data, params: { id: instructor.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [InstructorQueries.update])

  const summaryInfo: CardContainer = {
    title: `Instructor: ${instructor.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Instructor`}
        formMeta={InstructorFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...instructor, provider: instructor.provider.id }}
        defaultFormValue={{ instructorId: instructor.id }}
        buttonLabel={`Update Instructor`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: instructor.name, },
      { label: 'Provider', value: renderLink(`/administration/course-provider/${instructor.provider.id}`, instructor.provider.name) },
      { label: 'Image', value: renderThumb(instructor.image, "Instructor's photo") },
      { label: 'Short bio', value: renderHtml(instructor.short_bio), },
      { label: 'Detail bio', value: renderHtml(instructor.detail_bio), },
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
      helpKey: "instructorSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: instructor.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Instructor Title - ${instructor.name}`,
    tabs: tabMetas
  }
}


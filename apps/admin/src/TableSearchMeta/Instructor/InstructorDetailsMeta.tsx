import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { InstructorQueries } from "~/packages/services/Api/Queries/AdminQueries/Instructors"
import { InstructorFormMeta } from "~/Component/Feature/Instructors/FormMeta/InstructorFormMeta"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderThumb } from "~/packages/components/ResponsiveTable/tableUtils"

export const getInstructorDetailsMeta = (instructor: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => InstructorQueries.update({ ...data, params: { id: instructor.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
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
      { label: 'Short bio', value: instructor.short_bio, },
      { label: 'Detail bio', value: instructor.detail_bio, },
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
  ]

  return {
    pageTitle: `Instructor Title - ${instructor.name}`,
    tabs: tabMetas
  }
}


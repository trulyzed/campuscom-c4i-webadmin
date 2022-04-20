import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CampusFormMeta } from "~/Component/Feature/Campuses/FormMeta/CampusFormMeta"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { message } from "antd"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { CampusQueries } from "~/packages/services/Api/Queries/AdminQueries/Campuses"

export const getCampusDetailsMeta = (campus: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CampusQueries.update({ ...data, params: { id: campus.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [CampusQueries.update])

  const summaryInfo: CardContainer = {
    title: `Campus: ${campus.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Campus`}
        formMeta={CampusFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...campus, provider: campus.provider.id }}
        defaultFormValue={{ campusId: campus.id }}
        buttonLabel={`Update Campus`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: campus.name, render: (text: any) => text },
      { label: 'Code', value: campus.code },
      { label: 'Provider', value: renderLink(`/administration/course-provider/${campus.provider.id}`, campus.provider.name), },
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
      helpKey: "campusSummaryTab"
    },
  ]

  return {
    pageTitle: `Campus Title - ${campus.name}`,
    tabs: tabMetas
  }
}

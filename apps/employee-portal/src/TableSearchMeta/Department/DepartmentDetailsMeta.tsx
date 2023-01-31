import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { DepartmentQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Departments"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getDepartmentFormMeta } from "~/Component/Feature/Departments/FormMeta/DepartmentFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"

export const getDepartmentDetailsMeta = (department: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => DepartmentQueries.update({ ...data, params: { id: department.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [DepartmentQueries.update])

  const summaryInfo: CardContainer = {
    title: `Department: ${department.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Department`}
        formMeta={getDepartmentFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...department, organization: department.organization.id }}
        buttonLabel={`Update Department`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: department.name },
      { label: 'Short Name', value: department.short_name },
      { label: 'Organization', value: department.organization.name },
      { label: 'Description', value: department.description },
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
      helpKey: "departmentSummaryTab"
    },
  ]

  return {
    pageTitle: `Department Title - ${department.name}`,
    tabs: tabMetas
  }
}

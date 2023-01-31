import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { EmployeeQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Employees"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getEmployeeFormMeta } from "~/Component/Feature/Employees/FormMeta/EmployeeFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderLink } from "@packages/components/lib/ResponsiveTable"

export const getEmployeeDetailsMeta = (employee: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => EmployeeQueries.update({ ...data, params: { id: employee.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [EmployeeQueries.update])

  const summaryInfo: CardContainer = {
    title: `Employee: ${employee.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Employee`}
        formMeta={getEmployeeFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...employee, organization: employee.organization.id }}
        buttonLabel={`Update Employee`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: employee.name },
      { label: 'Department', value: renderLink(`/administration/course-provider/${employee.department.id}`, employee.department.name) },
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
      helpKey: "employeeSummaryTab"
    },
  ]

  return {
    pageTitle: `Employee Title - ${employee.name}`,
    tabs: tabMetas
  }
}

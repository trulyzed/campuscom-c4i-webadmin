import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getEmployeeDetailsMeta } from "~/TableSearchMeta/Employee/EmployeeDetailsMeta"
import { EmployeeQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Employees"

export function EmployeeDetailsPage(props: RouteComponentProps<{ employeeID?: string }>) {
  const EmployeeID = props?.match?.params?.employeeID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getEmployeeDetailsMeta} getDetailsPageContent={EmployeeQueries.getSingle} entityType="employee" entityID={EmployeeID} titleKey="name" />
}
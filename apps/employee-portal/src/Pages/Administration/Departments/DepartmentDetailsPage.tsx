import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getDepartmentDetailsMeta } from "~/TableSearchMeta/Department/DepartmentDetailsMeta"
import { DepartmentQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Departments"

export function DepartmentDetailsPage(props: RouteComponentProps<{ departmentID?: string }>) {
  const DepartmentID = props?.match?.params?.departmentID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getDepartmentDetailsMeta} getDetailsPageContent={DepartmentQueries.getSingle} entityType="department" entityID={DepartmentID} titleKey="name" />
}
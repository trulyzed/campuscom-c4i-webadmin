import { endpoints } from "~/Api/Queries/EmployeePortalQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IEnrollmentQueries } from "./Proxy/Enrollments"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const EnrollmentQueries: IEnrollmentQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.ENROLLMENT}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeEnrollment, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_ENROLLMENT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeEnrollment, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_ENROLLMENT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeEnrollment, action: ApiPermissionAction.Read }]
  )
}

import { endpoints } from "~/Api/Queries/EmployeePortalQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IEmployeeQueries } from "./Proxy/Employees"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const EmployeeQueries: IEmployeeQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.EMPLOYEE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Employee, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_EMPLOYEE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Employee, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_EMPLOYEE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Employee, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.EMPLOYEE,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.Employee, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.EMPLOYEE}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.Employee, action: ApiPermissionAction.Write }]
  )
}

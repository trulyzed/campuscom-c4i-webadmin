import { endpoints } from "~/Api/Queries/EmployeePortalQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IDepartmentQueries } from "./Proxy/Departments"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const DepartmentQueries: IDepartmentQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.DEPARTMENT}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Department, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_DEPARTMENT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Department, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_DEPARTMENT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Department, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_DEPARTMENT,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Department, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.DEPARTMENT,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.Department, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.DEPARTMENT}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.Department, action: ApiPermissionAction.Write }]
  )
}

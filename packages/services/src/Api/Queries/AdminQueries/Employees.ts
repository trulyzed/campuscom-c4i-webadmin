import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IEmployeeQueries, processEmployees } from "./Proxy/Employees"

export const EmployeeQueries: IEmployeeQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.EMPLOYEE_PROFILE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processEmployees([resp.data])[0] } : resp))
    },
    [{ operation: ApiPermissionClass.EmployeeProfile, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_EMPLOYEE_PROFILE,
        ...data,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processEmployees(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.EmployeeProfile, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_EMPLOYEE_PROFILE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processEmployees(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.EmployeeProfile, action: ApiPermissionAction.Read }]
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
  ),

  tagSkill: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.EMPLOYEE_PROFILE,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.EmployeeProfile, action: ApiPermissionAction.Write }]
  )
}

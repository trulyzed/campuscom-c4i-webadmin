import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { ICompanyUserQueries, processCompanyUsers } from "./Proxy/CompanyUsers"

export const CompanyUserQueries: ICompanyUserQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COMPANY_USER}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processCompanyUsers([resp.data])[0] } : resp))
    },
    [{ operation: ApiPermissionClass.CompanyUser, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_COMPANY_USER,
        ...data,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processCompanyUsers(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.CompanyUser, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_COMPANY_USER,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processCompanyUsers(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.CompanyUser, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.COMPANY_USER,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CompanyUser, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COMPANY_USER}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.CompanyUser, action: ApiPermissionAction.Write }]
  )
}

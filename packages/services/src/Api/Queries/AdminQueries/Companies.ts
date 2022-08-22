import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { ICompanyQueries } from "./Proxy/Companies"

export const CompanyQueries: ICompanyQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COMPANY}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Company, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_COMPANY,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Company, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_COMPANY,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Company, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_COMPANY,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: (resp.data as Array<any>).map((i) => ({ id: i.id, name: i.company_name }))
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.Company, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.COMPANY,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.Company, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COMPANY}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.Company, action: ApiPermissionAction.Write }]
  ),

  delete: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.DELETE_COMPANY}`,
        method: "DELETE",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DeleteCompany, action: ApiPermissionAction.Delete }]
  )
}

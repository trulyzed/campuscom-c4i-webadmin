import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IOrganizationQueries } from "./Proxy/Organizations"

export const OrganizationQueries: IOrganizationQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.ORGANIZATION}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Organization, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_ORGANIZATION,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Organization, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_ORGANIZATION,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Organization, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_ORGANIZATION,
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
    [{ operation: ApiPermissionClass.Organization, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ORGANIZATION,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.Organization, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.ORGANIZATION}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.Organization, action: ApiPermissionAction.Write }]
  )
}

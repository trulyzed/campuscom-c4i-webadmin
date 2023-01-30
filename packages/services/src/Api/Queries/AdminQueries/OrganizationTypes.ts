import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IOrganizationTypeQueries } from "./Proxy/OrganizationTypes"

export const OrganizationTypeQueries: IOrganizationTypeQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.ORGANIZATION_TYPE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.OrganizationType, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_ORGANIZATION_TYPE,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.OrganizationType, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_ORGANIZATION_TYPE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.OrganizationType, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_ORGANIZATION_TYPE,
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
    [{ operation: ApiPermissionClass.OrganizationType, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ORGANIZATION_TYPE,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.OrganizationType, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.ORGANIZATION_TYPE}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.OrganizationType, action: ApiPermissionAction.Write }]
  )
}

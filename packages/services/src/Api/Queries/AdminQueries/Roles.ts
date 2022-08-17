import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IRoleQueries } from "./Proxy/Roles"

export const RoleQueries: IRoleQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.CUSTOM_ROLE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_CUSTOM_ROLE,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read }]
  ),

  getPermissionList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_PERMISSION,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_CUSTOM_ROLE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_CUSTOM_ROLE,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: (resp.data as Array<any>).map((i) => ({ id: i.id, name: i.name }))
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.CUSTOM_ROLE,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id } = data?.params
      const payload = {
        ...data?.data
      }
      return adminApi({
        endpoint: `${endpoints.CUSTOM_ROLE}/${id}`,
        method: "PATCH",
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Write }]
  )
}

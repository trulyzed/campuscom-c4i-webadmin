import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IUserQueries } from "./Proxy/Users"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const UserQueries: IUserQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.USER}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CustomUser, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_USER,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CustomUser, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_USER}/${data?.params.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CustomUser, action: ApiPermissionAction.Read }]
  ),

  getListByStore: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.STORE_USER}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.StoreUser, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.USER,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CustomUser, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.USER}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.CustomUser, action: ApiPermissionAction.Write }]
  ),

  resetPassword: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.RESET_PASSWORD}`,
        method: "PATCH",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.ResetPassword, action: ApiPermissionAction.Write }]
  )
}

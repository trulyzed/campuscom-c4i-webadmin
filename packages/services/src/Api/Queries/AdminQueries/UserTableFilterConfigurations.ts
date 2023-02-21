import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IUserTableFilterConfigurationQueries } from "./Proxy/UserTableFilterConfigurations"

export const UserTableFilterConfigurationQueries: IUserTableFilterConfigurationQueries = {
  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.USER_TABLE_FILTER_CONFIGURATION}`,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: (resp.data as any[]).map((i) => ({ id: i.id, ...i.filter }))
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.UserTableFilterConfiguration, action: ApiPermissionAction.Read }]
  ),
  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.USER_TABLE_FILTER_CONFIGURATION,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.UserTableFilterConfiguration, action: ApiPermissionAction.Write }]
  ),
  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.USER_TABLE_FILTER_CONFIGURATION}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.UserTableFilterConfiguration, action: ApiPermissionAction.Write }]
  )
}

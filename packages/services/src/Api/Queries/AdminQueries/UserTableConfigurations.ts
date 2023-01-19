import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IUserTableConfigurationQueries } from "./Proxy/UserTableConfigurations"

export const UserTableConfigurationQueries: IUserTableConfigurationQueries = {
  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.USER_TABLE_CONFIGURATION}`,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: (resp.data as any[]).map((i) => ({ ...i.configuration }))[0]
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.UserTableConfiguration, action: ApiPermissionAction.Read }]
  ),
  save: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.USER_TABLE_CONFIGURATION}`,
        ...data,
        method: "POST"
      })
    },
    [{ operation: ApiPermissionClass.UserTableConfiguration, action: ApiPermissionAction.Read }]
  ),
  delete: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.USER_TABLE_CONFIGURATION}`,
        ...data,
        params: undefined,
        data: {
          table_name: data?.params?.table_name,
          value: {}
        },
        method: "POST"
      })
    },
    [{ operation: ApiPermissionClass.UserTableConfiguration, action: ApiPermissionAction.Read }]
  )
}

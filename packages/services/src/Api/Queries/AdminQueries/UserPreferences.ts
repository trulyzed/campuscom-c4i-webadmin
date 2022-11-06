import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IUserPreferenceQueries } from "./Proxy/UserPreferences"

export const UserPreferenceQueries: IUserPreferenceQueries = {
  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.USER_PREFERENCE}`,
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
    [{ operation: ApiPermissionClass.UserPreference, action: ApiPermissionAction.Read }]
  ),
  save: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.USER_PREFERENCE}`,
        ...data,
        method: "POST"
      })
    },
    [{ operation: ApiPermissionClass.UserPreference, action: ApiPermissionAction.Write }]
  )
}

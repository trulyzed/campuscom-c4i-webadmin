import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IPreferenceQueries } from "./Proxy/Preferences"

export const PreferenceQueries:IPreferenceQueries = {
  getPreferences: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.PREFERENCE}`,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as any[]).map(i => ({...i.configuration}))[0]
    }): resp)
  }, [{operation: ApiPermissionClass.Preference, action: ApiPermissionAction.Read}]),
  saveOrUpdatePreferences: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.PREFERENCE}`,
      ...data,
      method: "POST"
    })
  }, [{operation: ApiPermissionClass.Preference, action: ApiPermissionAction.Read}]),
  deletePreferences: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.PREFERENCE}`,
      ...data,
      params: undefined,
      data: {
        table_name: data?.params?.table_name,
        value: {}
      },
      method: "POST"
    })
  }, [{operation: ApiPermissionClass.Preference, action: ApiPermissionAction.Read}]),
}
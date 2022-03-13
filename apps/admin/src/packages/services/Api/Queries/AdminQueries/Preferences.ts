//import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ConstructQuery } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IPreferenceQueries } from "./Proxy/Preferences"

export const PreferenceQueries:IPreferenceQueries = {
  getPreferences: ConstructQuery(data => {
    return Promise.resolve({
      code: 200,
      error: null,
      data: null,
      success: true,
    })
  }, {operation: ApiPermissionClass.Preference, action: ApiPermissionAction.Read}),
  saveOrUpdatePreferences: ConstructQuery(data => {
    return adminApi({
      endpoint: `${'endpoints.PREFERENCE'}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  }, {operation: ApiPermissionClass.Preference, action: ApiPermissionAction.Read}),
  deletePreferences: ConstructQuery(data => {
    return adminApi({
      endpoint: `${'endpoints.PREFERENCE'}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  }, {operation: ApiPermissionClass.Preference, action: ApiPermissionAction.Read}),
}
import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IQuery, PreferenceQuery } from "~/packages/services/Api/Queries/AdminQueries/types";

export const PreferenceQueries:IQuery<PreferenceQuery> = {
  getPreferences: async (data: any) => {
    return adminApi({
      endpoint: `${endpoints.CART}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
  saveOrUpdatePreferences: async (data: any) => {
    return adminApi({
      endpoint: `${endpoints.CART}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
  deletePreferences: async (data: any) => {
    return adminApi({
      endpoint: `${endpoints.CART}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
}
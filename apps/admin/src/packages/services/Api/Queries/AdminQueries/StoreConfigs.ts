import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IStoreConfigQueries } from "./Proxy/StoreConfigs"

export const StoreConfigQueries:IStoreConfigQueries = {
  getSingle: PermissionWrapper(data => {
    const { id, ...params } = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}/${id}`,
      method: "GET",
      ...data,
      params
    })
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Write}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.ALL_STORE_CONFIGURATION}`,
      method: "GET",
      ...data,
    })
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Write}]),

  delete: PermissionWrapper(data => {
    const { id, ...payload } = data?.data
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}/${id}`,
      method: "DELETE",
      ...data,
      data: payload
    })
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Delete}]),
}

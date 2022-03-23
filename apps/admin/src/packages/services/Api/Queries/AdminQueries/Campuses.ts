import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ICampusQueries } from "./Proxy/Campuses"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const CampusQueries:ICampusQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.CAMPUS}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Campus, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_CAMPUS,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Campus, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.CAMPUS}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Campus, action: ApiPermissionAction.Read}]),
}
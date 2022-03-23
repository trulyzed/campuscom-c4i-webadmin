import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ISectionQueries } from "./Proxy/Sections"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const SectionQueries:ISectionQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.SECTION}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Section, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_SECTION,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Section, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.SECTION}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Section, action: ApiPermissionAction.Read}]),
}
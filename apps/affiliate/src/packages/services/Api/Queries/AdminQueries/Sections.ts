import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ISectionQueries } from "./Proxy/Sections"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { mapDatetimeToPayload } from "~/packages/utils/mapper"

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
      endpoint: `${endpoints.ALL_SECTION}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Section, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      start_date: mapDatetimeToPayload(data?.data?.start_date),
      end_date: mapDatetimeToPayload(data?.data?.end_date),
      registration_deadline: mapDatetimeToPayload(data?.data?.registration_deadline),
    }
    return adminApi({
      endpoint: endpoints.SECTION,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.Section, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    const payload = {
      ...data?.data,
      start_date: mapDatetimeToPayload(data?.data?.start_date),
      end_date: mapDatetimeToPayload(data?.data?.end_date),
      registration_deadline: mapDatetimeToPayload(data?.data?.registration_deadline),
    }
    return adminApi({
      endpoint: `${endpoints.SECTION}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.Section, action: ApiPermissionAction.Write}]),
}
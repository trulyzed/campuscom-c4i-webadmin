import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IScheduleQueries } from "./Proxy/Schedules"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { mapDatetimeToPayload } from "~/packages/utils/mapper"

export const ScheduleQueries:IScheduleQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.SECTION_SCHEDULE}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Schedule, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_SECTION_SCHEDULE,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Schedule, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_SECTION_SCHEDULE}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Schedule, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      start_at: mapDatetimeToPayload(data?.data?.start_at),
      end_at: mapDatetimeToPayload(data?.data?.end_at),
    }
    return adminApi({
      endpoint: endpoints.SECTION_SCHEDULE,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.Schedule, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      start_at: mapDatetimeToPayload(data?.data?.start_at),
      end_at: mapDatetimeToPayload(data?.data?.end_at),
    }
    return adminApi({
      endpoint: `${endpoints.SECTION_SCHEDULE}/${data?.data.id}`,
      method: "PATCH",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.Section, action: ApiPermissionAction.Write}]),
}
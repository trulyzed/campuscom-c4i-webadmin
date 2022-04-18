import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IDiscountProgramQueries } from "./Proxy/DiscountPrograms"
import { mapDatetimeToPayload } from "~/packages/utils/mapper"

export const DiscountProgramQueries:IDiscountProgramQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.DISCOUNT_PROGRAM}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.DiscountProgram, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_DISCOUNT_PROGRAM,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.DiscountProgram, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_DISCOUNT_PROGRAM,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.DiscountProgram, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_DISCOUNT_PROGRAM,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, [{operation: ApiPermissionClass.DiscountProgram, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      start_date: mapDatetimeToPayload(data?.data.start_date),
      end_date: mapDatetimeToPayload(data?.data.end_date),
    }
    return adminApi({
      endpoint: endpoints.DISCOUNT_PROGRAM,
      method: "POST",
      ...data,
      data: payload
    })
  }, [{operation: ApiPermissionClass.DiscountProgram, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      start_date: mapDatetimeToPayload(data?.data.start_date),
      end_date: mapDatetimeToPayload(data?.data.end_date),
    }
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.DISCOUNT_PROGRAM}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.DiscountProgram, action: ApiPermissionAction.Write}]),

  delete: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_DISCOUNT_PROGRAM}`,
      method: "DELETE",
      ...data
    })
  }, [{operation: ApiPermissionClass.DeleteDiscountProgram, action: ApiPermissionAction.Delete}]),
}

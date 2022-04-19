import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IMembershipProgramQueries } from "./Proxy/MembershipPrograms"
import { mapDatetimeToPayload } from "~/packages/utils/mapper"

export const MembershipProgramQueries:IMembershipProgramQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.MEMBERSHIP_PROGRAM}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.MembershipProgram, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_MEMBERSHIP_PROGRAM,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.MembershipProgram, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_MEMBERSHIP_PROGRAM,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.MembershipProgram, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_MEMBERSHIP_PROGRAM,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.title}))
    }) : resp)
  }, [{operation: ApiPermissionClass.MembershipProgram, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      start_date: mapDatetimeToPayload(data?.data.start_date),
      end_date: mapDatetimeToPayload(data?.data.end_date),
    }
    return adminApi({
      endpoint: endpoints.MEMBERSHIP_PROGRAM,
      method: "POST",
      ...data,
      data: payload
    })
  }, [{operation: ApiPermissionClass.MembershipProgram, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      start_date: mapDatetimeToPayload(data?.data.start_date),
      end_date: mapDatetimeToPayload(data?.data.end_date),
    }
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.MEMBERSHIP_PROGRAM}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.MembershipProgram, action: ApiPermissionAction.Write}]),

  delete: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_MEMBERSHIP_PROGRAM}`,
      method: "DELETE",
      ...data
    })
  }, [{operation: ApiPermissionClass.DeleteMembershipProgram, action: ApiPermissionAction.Delete}]),

  getListByParticipant: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_MEMBERSHIP_PROGRAM_PARTICIPANT,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.MembershipProgramParticipant, action: ApiPermissionAction.Read}]),

  tagDiscountProgram: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      is_remove: true,
      type: 'product',
      operator: 'in',
    };

    return adminApi({
      endpoint: `${endpoints.DISCOUNT_RULE}`,
      method: "POST",
      ...data,
      data: payload
    })
  }, [{operation: ApiPermissionClass.DiscountRule, action: ApiPermissionAction.Write}]),

  untagDiscountProgram: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_MEMBERSHIP_PROGRAM_DISCOUNT}`,
      method: "DELETE",
      ...data,
    })
  }, [{operation: ApiPermissionClass.MembershipProgramDiscount, action: ApiPermissionAction.Delete}]),
}

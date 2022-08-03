import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IStudentQueries } from "./Proxy/Students"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"
import { mapDatetimeToPayload } from "~/packages/utils/mapper"

export const StudentQueries:IStudentQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STUDENT}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Profile, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_STUDENT,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Profile, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_STUDENT,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Profile, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_STUDENT,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: `${i.first_name} ${i.last_name}`}))
    }) : resp)
  }, [{operation: ApiPermissionClass.Profile, action: ApiPermissionAction.Read}]),

  update: PermissionWrapper(data => {
    const payload = convertToFormData({...data?.data, profile_picture_uri: data?.data.image_file?.length ? data?.data.image_file : undefined, date_of_birth: mapDatetimeToPayload(data?.data.date_of_birth, true)})
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STUDENT}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.Profile, action: ApiPermissionAction.Write}]),

  getListByMembershipProgram: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.MEMBERSHIP_PROGRAM_PARTICIPANT}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.MembershipProgramParticipant, action: ApiPermissionAction.Read}]),

  getListByCartItem: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_CART_ITEM_PROFILE}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CartItemProfile, action: ApiPermissionAction.Read}]),

  getListByContactGroup: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_CONTACT_GROUP_PROFILE}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.ContactGroupProfile, action: ApiPermissionAction.Read}]),

  tagMembersipProgram: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.MEMBERSHIP_PROGRAM_PARTICIPANT}`,
      method: "POST",
      ...data,
    })
  }, [{operation: ApiPermissionClass.MembershipProgramParticipant, action: ApiPermissionAction.Write}]),

  untagMembersipProgram: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_MEMBERSHIP_PROGRAM_PARTICIPANT}`,
      method: "DELETE",
      ...data,
    })
  }, [{operation: ApiPermissionClass.DeleteMembershipProgramParticipant, action: ApiPermissionAction.Delete}]),
}
import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IContactGroupQueries } from "./Proxy/ContactGroups"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const ContactGroupQueries:IContactGroupQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.CONTACT_GROUP}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.ContactGroup, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_CONTACT_GROUP,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.ContactGroup, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_CONTACT_GROUP}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.ContactGroup, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.CONTACT_GROUP,
      method: "POST",
      ...data,
    })
  }, [{operation: ApiPermissionClass.ContactGroup, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.CONTACT_GROUP}/${id}`,
      method: "PATCH",
      ...data,
      params
    })
  }, [{operation: ApiPermissionClass.ContactGroup, action: ApiPermissionAction.Write}]),

  tagProfile: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.CONTACT_GROUP_PROFILE}`,
      method: "POST",
      ...data
    })
  }, [{operation: ApiPermissionClass.ContactGroupProfile, action: ApiPermissionAction.Write}]),

  untagProfile: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_CONTACT_GROUP_PROFILE}`,
      method: "DELETE",
      ...data,
    })
  }, [{operation: ApiPermissionClass.DeleteContactGroupProfile, action: ApiPermissionAction.Delete}]),
}
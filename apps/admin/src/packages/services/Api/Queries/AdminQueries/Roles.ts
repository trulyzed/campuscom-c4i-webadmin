import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IRoleQueries } from "./Proxy/Roles"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const RoleQueries:IRoleQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.CUSTOM_ROLE}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_CUSTOM_ROLE,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_CUSTOM_ROLE,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_CUSTOM_ROLE,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, [{operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = convertToFormData({
      ...data?.data,
      role_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined,
    })
    return adminApi({
      endpoint: endpoints.CUSTOM_ROLE,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = convertToFormData({
      ...data?.data,
      role_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined,
    })
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.CUSTOM_ROLE}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.CustomRole, action: ApiPermissionAction.Write}]),
}

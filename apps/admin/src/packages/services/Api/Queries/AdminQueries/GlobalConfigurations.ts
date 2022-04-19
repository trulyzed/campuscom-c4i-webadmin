import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IGlobalConfigurationQueries } from "./Proxy/GlobalConfigurations"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const GlobalConfigurationQueries:IGlobalConfigurationQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.GLOBAL_CONFIGURATION}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.GlobalConfiguration, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_GLOBAL_CONFIGURATION,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.GlobalConfiguration, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.GLOBAL_CONFIGURATION}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.GlobalConfiguration, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      configuration: JSON.parse(data?.data.configuration || undefined)
    }
    return adminApi({
      endpoint: endpoints.GLOBAL_CONFIGURATION,
      method: "POST",
      ...data,
      data: payload
    })
  }, [{operation: ApiPermissionClass.GlobalConfiguration, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      configuration: JSON.parse(data?.data.configuration || undefined)
    }
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.GLOBAL_CONFIGURATION}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.GlobalConfiguration, action: ApiPermissionAction.Write}]),

  getLookupDataOfAcceptedFileTypeOfAttachmentQuestion: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.GLOBAL_CONFIGURATION}`,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? {
      ...resp,
      data: resp.data.find((i: any) => i.label === 'Accepted file types for attachment question')?.configuration?.types?.map((i: any) => ({name: i, id: i}))
    } : resp)
  }, [{operation: ApiPermissionClass.GlobalConfiguration, action: ApiPermissionAction.Read}]),
}
import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IStoreDomainConfigurationQueries } from "./Proxy/StoreDomainConfigurations"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { mapDatetimeToPayload } from "~/packages/utils/mapper"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const StoreDomainConfigurationQueries:IStoreDomainConfigurationQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_DOMAIN_CONFIGURATION}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_STORE_DOMAIN_CONFIGURATION,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_STORE_DOMAIN_CONFIGURATION,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      expiry_at: mapDatetimeToPayload(data?.data?.expiry_at),
    }

    return adminApi({
      endpoint: endpoints.STORE_DOMAIN_CONFIGURATION,
      method: "POST",
      ...data,
      data: convertToFormData(payload)
    })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      expiry_at: mapDatetimeToPayload(data?.data?.expiry_at),
    }
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_DOMAIN_CONFIGURATION}/${id}`,
      method: "PATCH",
      ...data,
      params,
      data: convertToFormData(payload)
    })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Write}]),
}
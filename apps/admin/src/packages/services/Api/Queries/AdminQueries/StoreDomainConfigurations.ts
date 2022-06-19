import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IStoreDomainConfigurationQueries } from "./Proxy/StoreDomainConfigurations"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const StoreDomainConfigurationQueries:IStoreDomainConfigurationQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_DOMAIN_CONFIGURATION}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
    // return Promise.resolve({
    //   code: 200,
    //   data: {id: '1212', store: {name: 'Test Store'}, domain: 'ne-academy.xyz', upload_at: '2022-04-14T08:45:25Z', expiry_at: '2035-05-20T08:45:25Z', expiry_status: 'safe', expiry_duration: 5, config: {}, note: 'A note'},
    //   success: true,
    //   error: undefined
    // })
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
    // return Promise.resolve({
    //   code: 200,
    //   data: [{id: '1212', store: {name: 'Test Store'}, domain: 'ne-academy.xyz', upload_at: '2022-04-14T08:45:25Z', expiry_at: '2035-05-20T08:45:25Z', expiry_status: 'safe', expiry_duration: 5, config: {}, note: 'A note'}],
    //   success: true,
    //   error: undefined
    // })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.STORE_DOMAIN_CONFIGURATION,
      method: "POST",
      ...data,
    })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_DOMAIN_CONFIGURATION}/${id}`,
      method: "PATCH",
      ...data,
      params
    })
  }, [{operation: ApiPermissionClass.StoreDomainConfiguration, action: ApiPermissionAction.Write}]),
}
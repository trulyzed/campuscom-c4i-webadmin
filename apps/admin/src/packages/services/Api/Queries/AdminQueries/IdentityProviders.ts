import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IIdentityProviderQueries } from "./Proxy/IdentityProviders"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const IdentityProviderQueries:IIdentityProviderQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.IDENTITY_PROVIDER}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.IdentityProvider, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_IDENTITY_PROVIDER,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.IdentityProvider, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.IDENTITY_PROVIDER}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.IdentityProvider, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_IDENTITY_PROVIDER,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, [{operation: ApiPermissionClass.IdentityProvider, action: ApiPermissionAction.Read}]),

  getListByStore: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_STORE_IDENTITY_PROVIDER}`,
      ...data,
      params,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: resp.data.map((i: any) => ({...i.identity_provider}))
    }) : resp)
  }, [{operation: ApiPermissionClass.StoreIdentityProvider, action: ApiPermissionAction.Read}]),
}
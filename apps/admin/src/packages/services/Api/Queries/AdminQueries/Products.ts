import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IProductQueries } from "./Proxy/Products"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const ProductQueries:IProductQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.PRODUCT}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_PRODUCT,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.PRODUCT}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read}]),
}
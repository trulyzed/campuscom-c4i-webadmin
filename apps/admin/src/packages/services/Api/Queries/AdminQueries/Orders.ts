import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IOrderQueries } from "./Proxy/Orders"
import { ConstructQuery } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const OrderQueries:IOrderQueries = {
  getSingle: ConstructQuery(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.CART}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    }).then(resp => {
      if (!resp.success) return resp
      const adjustedData = resp.data
      return {
        ...resp,
        data: adjustedData
      }
    })
  }, {operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read}),

  getPaginatedList: ConstructQuery(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_CART,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, {operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read}),
}
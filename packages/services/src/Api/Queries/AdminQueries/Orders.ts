import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IOrderQueries } from "./Proxy/Orders"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const OrderQueries: IOrderQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.CART}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => {
        if (!resp.success) return resp
        const adjustedData = resp.data
        return {
          ...resp,
          data: adjustedData
        }
      })
    },
    [{ operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_CART,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.CART,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Write }]
  )
}

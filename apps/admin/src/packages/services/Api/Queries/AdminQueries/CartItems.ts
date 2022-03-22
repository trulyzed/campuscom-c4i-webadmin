import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ICartItemQueries } from "./Proxy/CartItems"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const CartItemQueries:ICartItemQueries = {
  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.CART}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    }).then(resp => {
      if (!resp.success) return resp
      const cartItemData = resp.data.cart_details
      return {
        ...resp,
        data: cartItemData
      }
    })
  }, [{operation: ApiPermissionClass.CartItem, action: ApiPermissionAction.Read}]),
}
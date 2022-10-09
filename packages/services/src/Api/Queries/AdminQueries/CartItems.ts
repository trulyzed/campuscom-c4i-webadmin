import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ICartItemQueries } from "./Proxy/CartItems"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const CartItemQueries: ICartItemQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.CART_ITEM}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CartItem, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_CART}/${data?.params.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => {
        if (!resp.success) return resp
        const cartItemData = resp.data.cart_details
        return {
          ...resp,
          data: cartItemData
        }
      })
    },
    [{ operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read }]
  )
}

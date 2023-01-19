import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IOrderQueries } from "./Proxy/Orders"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { convertToFormData } from "~/Api/utils/ConvertToFormData"

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
      const payload = convertToFormData(data?.data)
      return adminApi({
        endpoint: endpoints.CREATE_ORDER,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.CreateOrder, action: ApiPermissionAction.Write }]
  ),

  createBulk: PermissionWrapper(
    (data) => {
      const payload = convertToFormData(data?.data)
      return adminApi({
        endpoint: endpoints.CREATE_ORDER_BULK,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.CreateOrderBulk, action: ApiPermissionAction.Write }]
  ),

  getCreatableOrderDetails: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.CREATABLE_ORDER_DETAILS,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CreatableOrderDetails, action: ApiPermissionAction.Write }]
  ),

  getCreatableOrderPaymentSummary: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.CREATABLE_ORDER_PAYMENT_SUMMARY,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CreatableOrderPaymentSummary, action: ApiPermissionAction.Write }]
  )
}

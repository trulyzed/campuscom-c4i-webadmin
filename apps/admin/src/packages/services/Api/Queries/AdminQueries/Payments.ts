import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IPaymentQueries } from "./Proxy/Payments"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const PaymentQueries:IPaymentQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.PAYMENT}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Payment, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_PAYMENT,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Payment, action: ApiPermissionAction.Read}]),

  getListByOrder: PermissionWrapper(data => {
    const { ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_PAYMENT}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Payment, action: ApiPermissionAction.Read}]),
}
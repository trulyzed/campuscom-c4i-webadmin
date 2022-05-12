import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IPaymentGatewayQueries } from "./Proxy/PaymentGateways"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const PaymentGatewayQueries:IPaymentGatewayQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.PAYMENT_GATEWAY}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.PaymentGateway, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_PAYMENT_GATEWAY,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.PaymentGateway, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_PAYMENT_GATEWAY}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.PaymentGateway, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_PAYMENT_GATEWAY,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, [{operation: ApiPermissionClass.PaymentGateway, action: ApiPermissionAction.Read}]),

  getListByStore: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_STORE_PAYMENT_GATEWAY}`,
      ...data,
      params,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: parseConfiguration(resp.data)
    }): resp)
  }, [{operation: ApiPermissionClass.StorePaymentGateway, action: ApiPermissionAction.Read}]),

  getSingleByStore: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.STORE_PAYMENT_GATEWAY}/${id}`,
      ...data,
      params,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: parseConfiguration([resp.data])[0],
    }): resp)
  }, [{operation: ApiPermissionClass.StorePaymentGateway, action: ApiPermissionAction.Read}]),
}

const parseConfiguration = (data: any[]): any[] => {
  return data.map(i => ({
    ...i,
    branding__text: i?.branding__logo?.['text'],
    branding__logo: i?.branding__logo?.['logo'],
  }))
}
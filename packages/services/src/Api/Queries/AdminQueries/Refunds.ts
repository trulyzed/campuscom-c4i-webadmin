import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IRefundQueries } from "./Proxy/Refunds"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const RefundQueries: IRefundQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.REFUND}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Refund, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_REFUND,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Refund, action: ApiPermissionAction.Read }]
  ),

  cancelEnrollment: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.RETRY_REFUND,
        ...data,
        params: { ...nonPaginationParams, task_name: "task_cancel_enrollment" },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Refund, action: ApiPermissionAction.Read }]
  ),

  updateTaxRecord: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.RETRY_REFUND,
        ...data,
        params: { ...nonPaginationParams, task_name: "task_tax_refund" },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Refund, action: ApiPermissionAction.Read }]
  ),

  sendInformationToCRM: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.RETRY_REFUND,
        ...data,
        params: { ...nonPaginationParams, task_name: "task_crm_update" },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Refund, action: ApiPermissionAction.Read }]
  )
}

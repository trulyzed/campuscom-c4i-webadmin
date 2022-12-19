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

  create: PermissionWrapper(
    (data) => {
      const payload = {
        ...data?.data,
        task_crm_update: data?.data.task_crm_update ? "pending" : "not_required",
        task_tax_refund: data?.data.task_tax_refund ? "pending" : "not_required",
        task_cancel_enrollment: data?.data.task_cancel_enrollment ? "pending" : "not_required"
      }

      return adminApi({
        endpoint: endpoints.REFUND,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.Refund, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.REFUND}/${data?.data.id}`,
        method: "PATCH",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.Refund, action: ApiPermissionAction.Write }]
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

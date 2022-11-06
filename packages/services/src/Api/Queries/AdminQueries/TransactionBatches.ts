import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ITransactionBatchQueries } from "./Proxy/TransactionBatches"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const TransactionBatchQueries: ITransactionBatchQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.TRANSACTION_BATCH}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.TransactionBatch, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.TRANSACTION_BATCH,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.TransactionBatch, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_TRANSACTION_BATCH,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.TransactionBatch, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      const payload = {
        ...data?.data,
        start_date: data?.data.start_date ? `${data.data.start_date} 00:00:00.000000+00` : undefined,
        end_date: data?.data.end_date ? `${data.data.end_date} 00:00:00.000000+00` : undefined
      }
      return adminApi({
        endpoint: endpoints.TRANSACTION_BATCH,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.TransactionBatch, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const payload = {
        ...data?.data,
        ...(data?.data.payment_ref && {
          payment_info: {
            ref: data.data.payment_ref,
            note: data.data.payment_note,
            revenue_percentage: data.data.revenue_percentage
          }
        }),
        status: "paid"
      }
      delete payload["revenue_percentage"]
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.TRANSACTION_BATCH}/${id}`,
        method: "PATCH",
        ...data,
        data: payload,
        params
      })
    },
    [{ operation: ApiPermissionClass.TransactionBatch, action: ApiPermissionAction.Write }]
  ),

  delete: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.DELETE_TRANSACTION_BATCH}`,
        method: "DELETE",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DeleteTransactionBatch, action: ApiPermissionAction.Delete }]
  ),

  download: PermissionWrapper(
    (data) => {
      const { batch_ref, ...params } = data?.params
      return adminApi({
        endpoint: endpoints.DOWNLOAD_TRANSACTION_BATCH,
        method: "GET",
        filename: `Batch-${batch_ref}`,
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.DownloadTransactionBatch, action: ApiPermissionAction.Read }]
  )
}

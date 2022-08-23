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
        payment_info: {
          ref: data?.data.payment_ref,
          note: data?.data.payment_note
        },
        start_date: `${data?.data.start_date} 00:00:00.000000+00`,
        end_date: `${data?.data.end_date} 00:00:00.000000+00`
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

  makePayment: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.TRANSACTION_BATCH,
        method: "POST",
        ...data
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
      return adminApi({
        endpoint: endpoints.DOWNLOAD_TRANSACTION_BATCH,
        method: "GET",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DownloadTransactionBatch, action: ApiPermissionAction.Read }]
  )
}

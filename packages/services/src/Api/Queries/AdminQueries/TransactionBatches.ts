import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ITransactionBatchQueries } from "./Proxy/TransactionBatches"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

const dummy = {
  id: "e8f24524-155e-4030-bc4f-ac711cc25956",
  batch_name: "Batch 1",
  start_date: "2022-02-01T08:45:25Z",
  end_date: "2022-02-01T08:45:25Z",
  status: "unpaid",
  payment_details: { payment_ref: "23RE23", payment_note: "Note 1", payment_date: "2022-02-01T08:45:25Z" }
}

export const TransactionBatchQueries: ITransactionBatchQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.STORE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => ({
        ...resp,
        data: dummy
      }))
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
        endpoint: endpoints.ALL_STORE,
        ...data,
        params,
        method: "GET"
      }).then((resp) => ({
        ...resp,
        data: [dummy]
      }))
    },
    [{ operation: ApiPermissionClass.TransactionBatch, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.TRANSACTION_BATCH,
        method: "POST",
        ...data
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

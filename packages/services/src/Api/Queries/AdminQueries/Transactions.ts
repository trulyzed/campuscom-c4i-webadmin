import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ITransactionQueries } from "./Proxy/Transactions"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const TransactionQueries: ITransactionQueries = {
  getList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_TRANSACTION,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: {
                list: resp.data.data,
                summary: resp.extraData,
                searchParams: nonPaginationParams
              }
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.Transaction, action: ApiPermissionAction.Read }]
  ),

  getTransactionReportList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_TRANSACTION_REPORT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.TransactionReport, action: ApiPermissionAction.Read }]
  )
}

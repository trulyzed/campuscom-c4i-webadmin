import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IEmployeeTransactionQueries } from "./Proxy/EmployeeTransactions"

export const EmployeeTransactionQueries: IEmployeeTransactionQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.EMPLOYEE_TRANSACTION}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeTransaction, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_EMPLOYEE_TRANSACTION,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeTransaction, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_EMPLOYEE_TRANSACTION,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeTransaction, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.EMPLOYEE_TRANSACTION,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.EmployeeTransaction, action: ApiPermissionAction.Write }]
  )
}

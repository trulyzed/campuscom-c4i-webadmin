import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IDiscountProgramUsageHistoryQueries } from "./Proxy/DiscountProgramUsageHistories"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const DiscountProgramUsageHistoryQueries:IDiscountProgramUsageHistoryQueries = {
  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_DISCOUNT_PROGRAM_USAGE_HISTORY,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.DiscountProgramUsageHistory, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_DISCOUNT_PROGRAM_USAGE_HISTORY}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.DiscountProgramUsageHistory, action: ApiPermissionAction.Read}]),
}
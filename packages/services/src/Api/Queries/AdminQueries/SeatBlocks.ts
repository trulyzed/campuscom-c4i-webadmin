import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ISeatBlockQueries } from "./Proxy/SeatBlocks"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { convertToFormData } from "~/Api/utils/ConvertToFormData"

export const SeatBlockQueries: ISeatBlockQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.SEAT_BLOCK}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.SeatBlock, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_SEAT_BLOCK,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.SeatBlock, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_SEAT_BLOCK}/${data?.params.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.SeatBlock, action: ApiPermissionAction.Read }]
  ),

  generateIndividualTokens: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.SEAT_TOKEN}`,
        method: "PATCH",
        ...data,
        data: { ...data?.data, token_type: "individual" }
      })
    },
    [{ operation: ApiPermissionClass.SeatToken, action: ApiPermissionAction.Write }]
  ),

  removeRegistration: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.REMOVE_SEAT_REGISTRATION,
        ...data,
        method: "POST"
      })
    },
    [{ operation: ApiPermissionClass.RemoveSeatRegistration, action: ApiPermissionAction.Write }]
  ),

  swapRegistration: PermissionWrapper(
    (data) => {
      const payload = convertToFormData(data?.data)
      return adminApi({
        endpoint: endpoints.SWAP_SEAT_REGISTRATION,
        ...data,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.SwapSeatRegistration, action: ApiPermissionAction.Write }]
  )
}

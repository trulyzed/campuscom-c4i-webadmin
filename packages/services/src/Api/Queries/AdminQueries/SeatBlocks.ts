import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ISeatBlockQueries } from "./Proxy/SeatBlocks"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

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

  getSeatList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_SEAT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Seat, action: ApiPermissionAction.Read }]
  ),

  registerStudent: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.SEAT_REGISTRATION,
        ...data,
        params: { ...nonPaginationParams },
        method: "POST"
      })
    },
    [{ operation: ApiPermissionClass.SeatRegistration, action: ApiPermissionAction.Write }]
  )
}

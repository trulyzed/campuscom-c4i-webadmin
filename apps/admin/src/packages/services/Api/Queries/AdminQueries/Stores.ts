import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IStoreQueries } from "./Proxy/Stores"

export const StoreQueries:IStoreQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getListByCoursePublishing: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PUBLISHING_STORE,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CoursePublishingStore, action: ApiPermissionAction.Read}]),
}

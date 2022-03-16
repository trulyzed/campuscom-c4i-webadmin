import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ConstructQuery } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IStoreQueries } from "./Proxy/Stores"

export const StoreQueries:IStoreQueries = {
  getList: ConstructQuery(data => {
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    })
  }, {operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}),

  getLookupData: ConstructQuery(data => {
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, {operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}),
}

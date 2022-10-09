import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { IExternalEntityQueries } from "./Proxy/ExternalEntities"

export const ExternalEntityQueries: IExternalEntityQueries = {
  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_EXTERNAL_ENTITY,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.ExternalEntity, action: ApiPermissionAction.Read }]
  )
}

import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IOtherPermissionQueries } from "./Proxy/OtherPermissions"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const OtherPermissionQueries: IOtherPermissionQueries = {
  checkRecordSessionPermission: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.CHECK_RECORD_SESSION_PERMISSION,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.PermissionRecordSession, action: ApiPermissionAction.Read }]
  )
}

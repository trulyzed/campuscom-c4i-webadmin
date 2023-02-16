import { endpoints } from "~/Api/Queries/EmployeePortalQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IProfileDetailsQueries } from "./Proxy/ProfileDetails"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const ProfileDetailsQueries: IProfileDetailsQueries = {
  getData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.PROFILE_DETAILS,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.ProfileDetails, action: ApiPermissionAction.Read }]
  )
}

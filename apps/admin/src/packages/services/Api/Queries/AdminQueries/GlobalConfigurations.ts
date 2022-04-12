import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IGlobalConfigurationQueries } from "./Proxy/GlobalConfigurations"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const GlobalConfigurationQueries:IGlobalConfigurationQueries = {
  getLookupDataOfAcceptedFileTypeOfAttachmentQuestion: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.GLOBAL_CONFIGURATION}`,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? {
      ...resp,
      data: resp.data.find((i: any) => i.label === 'Accepted file types for attachment question')?.configuration?.types?.map((i: any) => ({name: i, id: i}))
    } : resp)
  }, [{operation: ApiPermissionClass.GlobalConfiguration, action: ApiPermissionAction.Read}]),
}
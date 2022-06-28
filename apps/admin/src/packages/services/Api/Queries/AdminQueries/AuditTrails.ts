import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IAuditTrailQueries } from "./Proxy/AuditTrails"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const AuditTrailQueries:IAuditTrailQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.AUDIT_TRAIL}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.AuditTrail, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_AUDIT_TRAIL,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.AuditTrail, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_AUDIT_TRAIL}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.AuditTrail, action: ApiPermissionAction.Read}]),
}
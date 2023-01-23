import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { PermissionWrapper } from "./Proxy"
import { ICertificatePublishingQueries } from "./Proxy/CertificatePublishings"

export const CertificatePublishingQueries: ICertificatePublishingQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params

      return adminApi({
        endpoint: `${endpoints.STORE_CERTIFICATE_RETRIEVE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.StoreCertificate, action: ApiPermissionAction.Read }]
  ),

  getReadyType: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.STORE_CERTIFICATE_READY_RETRIEVE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.StoreCertificate, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_STORE_CERTIFICATE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.StoreCertificate, action: ApiPermissionAction.Read }]
  ),

  update: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.STORE_CERTIFICATE}`,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.StoreCertificate, action: ApiPermissionAction.Write }]
  )
}

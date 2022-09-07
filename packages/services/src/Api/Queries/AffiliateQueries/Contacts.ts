import { endpoints } from "~/Api/Queries/AffiliateQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IContactQueries, processContacts } from "./Proxy/Contacts"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const ContactQueries: IContactQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.CONTACT}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processContacts([resp.data])[0] } : resp))
    },
    [{ operation: ApiPermissionClass.Contact, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_CONTACT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processContacts(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.Contact, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_CONTACT}/${data?.params.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processContacts(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.Contact, action: ApiPermissionAction.Read }]
  )
}

import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { PermissionWrapper } from "./Proxy"
import { IContactQueries, processContacts } from "./Proxy/Contacts"

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

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_CONTACT,
        ...data,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processContacts(resp.data) } : resp))
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

  getListByContactGroup: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_CONTACT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Contact, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_CONTACT,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: processContacts(resp.data)
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.Contact, action: ApiPermissionAction.Read }]
  )
}

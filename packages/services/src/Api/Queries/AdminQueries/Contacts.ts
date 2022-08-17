import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { PermissionWrapper } from "./Proxy"
import { IContactQueries } from "./Proxy/Contacts"
import { processStudents } from "./Proxy/Students"

export const ContactQueries: IContactQueries = {
  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_CONTACT,
        ...data,
        method: "GET"
      })
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
              data: processStudents(resp.data)
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.Contact, action: ApiPermissionAction.Read }]
  )
}

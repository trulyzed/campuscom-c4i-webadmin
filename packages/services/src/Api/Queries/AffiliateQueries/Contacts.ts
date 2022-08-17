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
    [{ operation: ApiPermissionClass.Profile, action: ApiPermissionAction.Read }]
  )
}

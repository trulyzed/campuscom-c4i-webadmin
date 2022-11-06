import jwt_decode from "jwt-decode"
import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IAuthQueries } from "./Proxy/Auth"
import { PermissionWrapper } from "./Proxy"

export const AuthQueries: IAuthQueries = {
  login: PermissionWrapper(
    async (data) => {
      const resp = await adminApi({
        endpoint: endpoints.LOGIN,
        ...data,
        method: "POST"
      })
      if (!resp.success) return resp

      const userData = resp.data
      const accessToken = resp.data.access
      if (accessToken) {
        const decodedData: { [key: string]: string } = jwt_decode(accessToken)
        userData["first_name"] = decodedData["first_name"]
        userData["last_name"] = decodedData["last_name"]
        userData["fullname"] = decodedData["first_name"] && decodedData["last_name"] ? `${decodedData["first_name"]} ${decodedData["last_name"]}` : undefined
        userData["email"] = decodedData["email"]
        delete userData["custom_roles"]
        delete userData["role"]
        delete userData["access"]
        delete userData["refresh"]
      }

      return {
        ...resp,
        data: {
          userData,
          access: accessToken
        }
      }
    },
    [{ is_public: true }]
  ),
  changePassword: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.CHANGE_PASSWORD}`,
        ...data,
        method: "PATCH"
      })
    },
    [{ is_public: true }]
  ),
  getMFA: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.ACTIVATE_MFA}`,
        ...data,
        method: "GET"
      })
    },
    [{ is_public: true }]
  ),
  enableMFA: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.ACTIVATE_MFA}`,
        ...data,
        method: "POST"
      })
    },
    [{ is_public: true }]
  ),
  disableMFA: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.DEACTIVATE_MFA}`,
        ...data,
        method: "GET"
      })
    },
    [{ is_public: true }]
  )
}

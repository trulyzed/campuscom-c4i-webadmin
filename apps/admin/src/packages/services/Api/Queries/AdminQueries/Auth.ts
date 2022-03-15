import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IAuthQueries } from "./Proxy/Auth"

export const AuthQueries:IAuthQueries = {
  login: async (data) => {
    return adminApi({
      endpoint: endpoints.LOGIN,
      ...data,
      method: "POST"
    })
  },
}

import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { AuthQuery, IQuery } from "~/packages/services/Api/Queries/AdminQueries/types";

export const AuthQueries:IQuery<AuthQuery> = {
  login: async (data) => {
    return adminApi({
      endpoint: endpoints.LOGIN,
      ...data,
      method: "POST"
    })
  },
}

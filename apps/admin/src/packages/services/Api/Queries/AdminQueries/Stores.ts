import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/types";

export const StoreQueries:Partial<IQuery> = {
  getList: async (data) => {
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    })
  },
}

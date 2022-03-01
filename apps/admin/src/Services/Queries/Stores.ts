import { endpoints } from "~/Services/Endpoints"
import { CallApi } from "~/Services/Api"
import { IQuery } from "~/Services/Queries/types";

export const StoreQueries:IQuery = {
  getList: async (data) => {
    return CallApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    })
  },
}

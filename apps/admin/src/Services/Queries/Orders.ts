import { endpoints } from "~/Services/Endpoints"
import { CallApi } from "~/Services/Api"
import { IQuery } from "~/Services/Queries/types";

export const OrderQueries:IQuery = {
  getSingle: async (data) => {
    return CallApi({
      endpoint: `${endpoints.CART}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
  getPaginatedList: async (data) => {
    return CallApi({
      endpoint: endpoints.CART,
      ...data,
      method: "GET"
    })
  },
}
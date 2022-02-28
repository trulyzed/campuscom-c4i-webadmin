import { endpoints } from "~/ApiServices/Endpoints"
import { CallApi } from "~/ApiServices/Api"
import { IQuery } from "~/ApiServices/Queries/types";

export const AuthQueries:IQuery = {
  login: async (data) => {
    return CallApi({
      endpoint: endpoints.LOGIN,
      ...data,
      method: "POST"
    })
  },
}

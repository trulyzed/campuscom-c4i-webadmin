import { endpoints } from "~/Services/Endpoints"
import { CallApi } from "~/Services/Api"
import { IQuery } from "~/Services/Queries/types";

export const AuthQueries:IQuery = {
  login: async (data) => {
    return CallApi({
      endpoint: endpoints.LOGIN,
      ...data,
      method: "POST"
    })
  },
}

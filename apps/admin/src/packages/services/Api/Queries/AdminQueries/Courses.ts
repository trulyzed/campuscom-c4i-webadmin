import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/types";

export const CourseQueries:Partial<IQuery> = {
  getSingle: async (data) => {
    return adminApi({
      endpoint: `${endpoints.COURSE}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
  getPaginatedList: async (data) => {
    return adminApi({
      endpoint: endpoints.COURSE,
      ...data,
      method: "GET"
    })
  },
}
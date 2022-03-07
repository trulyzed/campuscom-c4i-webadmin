import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/types";

export const CourseProviderQueries:IQuery = {
  getSingle: async (data) => {
    return adminApi({
      endpoint: `${endpoints.COURSE_PROVIDER}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
  getPaginatedList: async (data) => {
    return adminApi({
      endpoint: endpoints.COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  },
  getList: async (data) => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  },
}

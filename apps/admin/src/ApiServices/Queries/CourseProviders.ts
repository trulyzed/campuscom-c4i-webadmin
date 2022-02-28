import { endpoints } from "~/ApiServices/Endpoints"
import { CallApi } from "~/ApiServices/Api"
import { IQuery } from "~/ApiServices/Queries/types";

export const CourseProviderQueries:IQuery = {
  getSingle: async (data) => {
    return CallApi({
      endpoint: `${endpoints.COURSE_PROVIDER}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
  getPaginatedList: async (data) => {
    return CallApi({
      endpoint: endpoints.COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  },
  getList: async (data) => {
    return CallApi({
      endpoint: endpoints.ALL_COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  },
}

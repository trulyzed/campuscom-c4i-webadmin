import { endpoints } from "~/ApiServices/Endpoints"
import { CallApi } from "~/ApiServices/Api"
import { IQuery } from "~/ApiServices/Queries/types";

export const CourseQueries:IQuery = {
  getSingle: async (data) => {
    return CallApi({
      endpoint: `${endpoints.COURSE}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  },
  getPaginatedList: async (data) => {
    return CallApi({
      endpoint: endpoints.COURSE,
      ...data,
      method: "GET"
    })
  },
}
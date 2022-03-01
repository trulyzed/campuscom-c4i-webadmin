import { endpoints } from "~/Services/Endpoints"
import { CallApi } from "~/Services/Api"
import { IQuery } from "~/Services/Queries/types";

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
import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ConstructQuery } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { ICourseProviderQueries } from "./Proxy/CourseProviders"

export const CourseProviderQueries:ICourseProviderQueries = {
  getSingle: ConstructQuery(data => {
    return adminApi({
      endpoint: `${endpoints.COURSE_PROVIDER}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  }, {operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}),

  getPaginatedList: ConstructQuery(data => {
    return adminApi({
      endpoint: endpoints.COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  }, {operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}),

  getList: ConstructQuery(data => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  }, {operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}),

  getLookupData: ConstructQuery(data => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PROVIDER,
      ...data,
      method: "GET"
    }).then(resp => ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }))
  }, {operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}),
}

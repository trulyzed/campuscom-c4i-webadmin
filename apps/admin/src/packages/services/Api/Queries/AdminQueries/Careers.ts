import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ICareerQueries } from "./Proxy/Careers"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const CareerQueries:ICareerQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.CAREER}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Career, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_CAREER,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Career, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.ALL_CAREER}`,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Career, action: ApiPermissionAction.Read}]),

  getListByCourse: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.TAGGED_COURSE_CAREER}`,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.TaggedCourseCareer, action: ApiPermissionAction.Read}]),
}
import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { ConstructQuery } from "./Proxy"
import { ICourseQueries } from "./Proxy/Courses"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const CourseQueries:ICourseQueries = {
  getSingle: ConstructQuery(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.COURSE}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, {operation: ApiPermissionClass.Course, action: ApiPermissionAction.Read}),

  getPaginatedList: ConstructQuery(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_COURSE,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, {operation: ApiPermissionClass.Course, action: ApiPermissionAction.Read}),

  create: ConstructQuery(data => {
    const payload = convertToFormData(data?.data || {})
    return adminApi({
      endpoint: endpoints.COURSE,
      method: "POST",
      ...data,
      data: payload,
    })
  }, {operation: ApiPermissionClass.Course, action: ApiPermissionAction.Write}),

  update: ConstructQuery(data => {
    const payload = convertToFormData(data?.data || {})
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.COURSE}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, {operation: ApiPermissionClass.Course, action: ApiPermissionAction.Write}),
}
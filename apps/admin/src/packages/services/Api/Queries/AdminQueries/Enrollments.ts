import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IEnrollmentQueries } from "./Proxy/Enrollments"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const EnrollmentQueries:IEnrollmentQueries = {
  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.CART}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read}]),

  getCourseEnrollmentList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.COURSE_ENROLLMENT}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CourseEnrollment, action: ApiPermissionAction.Read}]),

  getSingleCourseEnrollment: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.COURSE_ENROLLMENT}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CourseEnrollment, action: ApiPermissionAction.Read}]),
}

import { endpoints } from "~/Api/Queries/EmployeePortalQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ICourseQueries } from "./Proxy/Courses"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const CourseQueries: ICourseQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COURSE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeCourse, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_COURSE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeCourse, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_COURSE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeCourse, action: ApiPermissionAction.Read }]
  ),

  enroll: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_COURSE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.EmployeeCourse, action: ApiPermissionAction.Read }]
  )
}

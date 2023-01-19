import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ICourseSharingContractQueries } from "./Proxy/CourseSharingContracts"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const CourseSharingContractQueries: ICourseSharingContractQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COURSE_SHARING_CONTRACT}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CourseSharingContract, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_COURSE_SHARING_CONTRACT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CourseSharingContract, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_COURSE_SHARING_CONTRACT}/${data?.params.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CourseSharingContract, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.COURSE_SHARING_CONTRACT}`,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CourseSharingContract, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COURSE_SHARING_CONTRACT}/${id}`,
        method: "PATCH",
        ...data,
        params
      })
    },
    [{ operation: ApiPermissionClass.CourseSharingContract, action: ApiPermissionAction.Write }]
  ),

  deactivate: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.DEACTIVATE_COURSE_SHARING_CONTRACT,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DeactivateCourseSharingContract, action: ApiPermissionAction.Write }]
  ),

  getAvailableCourseList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_COURSE_SHARING_CONTRACT_COURSE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CourseSharingContractCourse, action: ApiPermissionAction.Read }]
  ),

  deactivateStoreCourse: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.DEACTIVATE_STORE_COURSE}`,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DeactivateStoreCourse, action: ApiPermissionAction.Write }]
  )
}

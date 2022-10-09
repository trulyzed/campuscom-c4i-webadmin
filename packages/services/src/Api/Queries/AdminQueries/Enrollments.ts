import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IEnrollmentQueries } from "./Proxy/Enrollments"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { convertToFormData } from "~/Api/utils/ConvertToFormData"

export const EnrollmentQueries: IEnrollmentQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.CART}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.CART}`,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_CART}`,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read }]
  ),

  getCourseEnrollmentList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_COURSE_ENROLLMENT}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CourseEnrollment, action: ApiPermissionAction.Read }]
  ),

  getSingleCourseEnrollment: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COURSE_ENROLLMENT}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CourseEnrollment, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      const payload = convertToFormData(data?.data)
      return adminApi({
        endpoint: endpoints.CREATE_ENROLLMENT,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.CreateEnrollment, action: ApiPermissionAction.Write }]
  ),

  createWithPurchaserInfo: PermissionWrapper(
    (data) => {
      const payload = convertToFormData(data?.data)
      return adminApi({
        endpoint: endpoints.CREATE_ENROLLMENT_WITH_PURCHASER,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.CreateEnrollmentWithPurchserInfo, action: ApiPermissionAction.Write }]
  ),

  getPaymentSummary: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.CREATE_ENROLLMENT_PAYMENT_SUMMARY,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CreateEnrollmentPaymentSummary, action: ApiPermissionAction.Write }]
  )
}

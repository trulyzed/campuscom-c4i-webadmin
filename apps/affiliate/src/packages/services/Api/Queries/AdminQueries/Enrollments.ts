import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IEnrollmentQueries } from "./Proxy/Enrollments"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

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

  create: PermissionWrapper(data => {
    const payload = convertToFormData(data?.data)
    return adminApi({
      endpoint: endpoints.CREATE_ENROLLMENT,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.CreateEnrollment, action: ApiPermissionAction.Write}]),

  createWithPurchaserInfo: PermissionWrapper(data => {
    const payload = convertToFormData(data?.data)
    return adminApi({
      endpoint: endpoints.CREATE_ENROLLMENT_WITH_PURCHASER,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.CreateEnrollmentWithPurchserInfo, action: ApiPermissionAction.Write}]),

  getPaymentSummary: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.CREATE_ENROLLMENT_PAYMENT_SUMMARY,
      method: "POST",
      ...data,
    })
  }, [{operation: ApiPermissionClass.CreateEnrollmentPaymentSummary, action: ApiPermissionAction.Write}]),
}

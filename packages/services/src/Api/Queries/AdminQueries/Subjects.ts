import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ISubjectQueries } from "./Proxy/Subjects"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { convertToFormData } from "~/Api/utils/ConvertToFormData"
import { mapDatetimeToPayload } from "@packages/utilities/lib/mapper"

export const SubjectQueries: ISubjectQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.SUBJECT}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Subject, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_SUBJECT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Subject, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params || {}
      return adminApi({
        endpoint: `${endpoints.ALL_SUBJECT}/${data?.params.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Subject, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      const payload = convertToFormData({
        ...data?.data,
        image: data?.data.image_file?.length ? data?.data.image_file : undefined,
        start_date: mapDatetimeToPayload(data?.data?.start_date),
        end_date: mapDatetimeToPayload(data?.data?.end_date)
      })
      return adminApi({
        endpoint: endpoints.SUBJECT,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.Subject, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const payload = convertToFormData({
        ...data?.data,
        image: data?.data.image_file?.length ? data?.data.image_file : undefined,
        start_date: mapDatetimeToPayload(data?.data?.start_date),
        end_date: mapDatetimeToPayload(data?.data?.end_date)
      })
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.SUBJECT}/${id}`,
        method: "PATCH",
        ...data,
        data: payload,
        params
      })
    },
    [{ operation: ApiPermissionClass.Subject, action: ApiPermissionAction.Write }]
  ),

  getListByCourse: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.STORE_COURSE_SUBJECT,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.StoreCourseSubject, action: ApiPermissionAction.Read }]
  )
}

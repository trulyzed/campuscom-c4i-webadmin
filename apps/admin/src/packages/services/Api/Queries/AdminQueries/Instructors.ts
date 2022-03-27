import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IInstructorQueries } from "./Proxy/Instructors"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const InstructorQueries:IInstructorQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.INSTRUCTOR}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Instructor, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_INSTRUCTOR,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Instructor, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.INSTRUCTOR}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Instructor, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = convertToFormData(data?.data || {})
    return adminApi({
      endpoint: endpoints.INSTRUCTOR,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.Instructor, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = convertToFormData(data?.data || {})
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.INSTRUCTOR}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.Instructor, action: ApiPermissionAction.Write}]),
}
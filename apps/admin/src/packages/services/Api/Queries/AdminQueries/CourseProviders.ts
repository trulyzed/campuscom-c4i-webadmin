import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { ICourseProviderQueries } from "./Proxy/CourseProviders"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const CourseProviderQueries:ICourseProviderQueries = {
  getSingle: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.COURSE_PROVIDER}/${data!.params!.id}`,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PROVIDER,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PROVIDER,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, [{operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = convertToFormData({...data?.data, course_provider_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined})
    return adminApi({
      endpoint: endpoints.COURSE_PROVIDER,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = convertToFormData({...data?.data, course_provider_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined})
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.COURSE_PROVIDER}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Write}]),

  generateApiKey: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.API_KEY,
      method: "POST",
      ...data,
    })
  }, [{operation: ApiPermissionClass.ApiKey, action: ApiPermissionAction.Write}]),
}

import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { PermissionWrapper } from "./Proxy"
import { ICourseQueries } from "./Proxy/Courses"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const CourseQueries:ICourseQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.COURSE}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Course, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_COURSE,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: resp.data.map((i: any) => ({
        ...i,
        course_provider: i.provider,
      }))
    }) : resp)
  }, [{operation: ApiPermissionClass.Course, action: ApiPermissionAction.Read}]),

  getListBySubject: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_COURSE_BY_SUBJECT,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CourseBySubject, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = convertToFormData({...data?.data, course_image_uri: data?.data.image_file?.length ? data?.data.image_file : undefined})
    return adminApi({
      endpoint: endpoints.COURSE,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.Course, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = convertToFormData({...data?.data, course_image_uri: data?.data.image_file?.length ? data?.data.image_file : undefined})
    const {id, ...params} = data?.params
    return adminApi({
      endpoint: `${endpoints.COURSE}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.Course, action: ApiPermissionAction.Write}]),

  tagToSubjects: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      catalogs: data?.data.subjects
    }
    return adminApi({
      endpoint: `${endpoints.STORE_COURSE_SUBJECT_TAGGING}/${data?.data.publishingId}`,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.StoreCourseSubject, action: ApiPermissionAction.Write}]),

  tagRegistrationQuestion: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      entity_type: 'course',
      entity_id: data?.data.course,
    }
    return adminApi({
      endpoint: `${endpoints.REGISTRATION_QUESTION}`,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.RegistrationQuestion, action: ApiPermissionAction.Write}]),

  untagRegistrationQuestion: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_REGISTRATION_QUESTION}`,
      method: "DELETE",
      ...data
    })
  }, [{operation: ApiPermissionClass.DeleteRegistrationQuestion, action: ApiPermissionAction.Delete}]),

  tagCareer: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.TAGGED_COURSE_CAREER_AND_SKILL}`,
      method: "POST",
      ...data,
      data: {...data?.data, threshold: undefined}
    })
  }, [{operation: ApiPermissionClass.TaggedCourseCareer, action: ApiPermissionAction.Write}]),
}
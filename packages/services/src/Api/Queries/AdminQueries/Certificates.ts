import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { PermissionWrapper } from "./Proxy"
import { ICertificateQueries } from "./Proxy/Certificates"
import { convertToFormData } from "~/Api/utils/ConvertToFormData"

export const CertificateQueries: ICertificateQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.CERTIFICATE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Certificate, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_CERTIFICATE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: resp.data.map((i: any) => ({
                ...i,
                course_provider: i.provider
              }))
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.Certificate, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      const payload = convertToFormData({ ...data?.data, certificate_image_uri: data?.data.image_file?.length ? data?.data.image_file : undefined })
      return adminApi({
        endpoint: endpoints.CERTIFICATE,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.Certificate, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      const payload = convertToFormData({ ...data?.data, certificate_image_uri: data?.data.image_file?.length ? data?.data.image_file : undefined })
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.CERTIFICATE}/${id}`,
        method: "PATCH",
        ...data,
        data: payload,
        params
      })
    },
    [{ operation: ApiPermissionClass.Certificate, action: ApiPermissionAction.Write }]
  ),

  tagCareer: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.TAGGED_CERTIFICATE_CAREER_AND_SKILL}`,
        method: "POST",
        ...data,
        data: { ...data?.data, threshold: undefined, matched_keywords: [] }
      })
    },
    [{ operation: ApiPermissionClass.TaggedCertificateCareerAndSkill, action: ApiPermissionAction.Write }]
  ),

  tagCourse: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.CERTIFICATE_COURSE}`,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.CertificateCourse, action: ApiPermissionAction.Write }]
  ),

  untagCourse: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.DELETE_CERTIFICATE_COURSE}`,
        method: "DELETE",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DeleteCertificateCourse, action: ApiPermissionAction.Delete }]
  )
}

import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { ICourseProviderQueries } from "./Proxy/CourseProviders"
import { convertToFormData } from "~/Api/utils/ConvertToFormData"
import { parseJSON } from "@packages/utilities/lib/parser"
import { IQueryParams } from "./Proxy/types"

export const CourseProviderQueries: ICourseProviderQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.COURSE_PROVIDER}/${data!.params!.id}`,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: parseConfiguration([resp.data])[0]
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_COURSE_PROVIDER,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_COURSE_PROVIDER,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: parseConfiguration(resp.data)
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_COURSE_PROVIDER,
        ...data,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: (resp.data as Array<any>).map((i) => ({ id: i.id, name: i.name }))
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      data = { ...processConfigurationPayload(data) }
      const payload = convertToFormData({ ...data?.data, course_provider_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined })
      return adminApi({
        endpoint: endpoints.COURSE_PROVIDER,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      data = { ...processConfigurationPayload(data) }
      const payload = convertToFormData({ ...data?.data, course_provider_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined })
      console.log(data, payload)
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.COURSE_PROVIDER}/${id}`,
        method: "PATCH",
        ...data,
        data: payload,
        params
      })
    },
    [{ operation: ApiPermissionClass.CourseProvider, action: ApiPermissionAction.Write }]
  ),

  tagProfileQuestion: PermissionWrapper(
    (data) => {
      const payload = {
        ...data?.data,
        provider_type: "course_provider",
        provider_ref: data?.data.course_provider
      }
      return adminApi({
        endpoint: `${endpoints.PROFILE_QUESTION}`,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.ProfileQuestion, action: ApiPermissionAction.Write }]
  ),

  untagProfileQuestion: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.DELETE_PROFILE_QUESTION}`,
        method: "DELETE",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DeleteProfileQuestion, action: ApiPermissionAction.Delete }]
  ),

  generateApiKey: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.API_KEY,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.ApiKey, action: ApiPermissionAction.Write }]
  )
}

const processConfigurationPayload = (data?: IQueryParams): IQueryParams => {
  const payload: { [key: string]: any } = {
    ...data?.data,
    configuration: parseJSON(data?.data.configuration || "{}")
  }

  // email receipt config
  if ("configuration__erp" in payload) {
    payload["configuration"] = { ...payload["configuration"], erp: payload["configuration__erp"] }
    delete payload["configuration__erp"]
  }
  if ("configuration__password" in payload) {
    payload["configuration"] = { ...payload["configuration"], password: payload["configuration__password"] }
    delete payload["configuration__password"]
  }
  if ("configuration__username" in payload) {
    payload["configuration"] = { ...payload["configuration"], username: payload["configuration__username"] }
    delete payload["configuration__username"]
  }
  if ("configuration__auth_type" in payload) {
    payload["configuration"] = { ...payload["configuration"], auth_type: payload["configuration__auth_type"] }
    delete payload["configuration__auth_type"]
  }
  if ("configuration__enrollment_url" in payload) {
    payload["configuration"] = { ...payload["configuration"], enrollment_url: payload["configuration__enrollment_url"] }
    delete payload["configuration__enrollment_url"]
  }

  return {
    ...data,
    data: payload
  }
}

const parseConfiguration = (data: any[]): any[] => {
  return data.map((i) => ({
    ...i,
    configuration__erp: i?.configuration?.["erp"],
    configuration__password: i?.configuration?.["password"],
    configuration__username: i?.configuration?.["username"],
    configuration__auth_type: i?.configuration?.["auth_type"],
    configuration__enrollment_url: i?.configuration?.["enrollment_url"]
  }))
}

import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { PermissionWrapper } from "./Proxy"
import { IPublishingQueries } from "./Proxy/Publishings"

const processSections = (data: Record<string, string | number | any[]>): Record<string, string | number | any[]> => {
  const newData = {
    ...data
  }
  for (const section of data.sections as any[]) {
    newData[`fee__${section.id}`] = section.fee
    newData[`token_fee__${section.id}`] = section.token_fee
  }
  return newData
}

export const PublishingQueries: IPublishingQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params

      return adminApi({
        endpoint: `${endpoints.STORE_COURSE_RETRIEVE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: processSections(resp.data)
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.StoreCourse, action: ApiPermissionAction.Read }]
  ),

  getSingleWithTaggedSubjects: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return Promise.all([
        PublishingQueries.getSingle(data),
        adminApi({
          endpoint: `${endpoints.STORE_COURSE_SUBJECT_TAGGING}/${data!.params!.id}`,
          ...data,
          params,
          method: "GET"
        })
      ]).then((responses) => {
        const [resp1, resp2] = responses
        return {
          ...resp1,
          ...resp2,
          data: {
            ...resp1.data,
            subjects: resp2.data.catalogs
          }
        }
      })
    },
    [
      { operation: ApiPermissionClass.StoreCourseSubjectTagging, action: ApiPermissionAction.Read },
      { operation: ApiPermissionClass.StoreCourse, action: ApiPermissionAction.Read }
    ]
  ),

  getReadyType: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.STORE_COURSE_READY_RETRIEVE}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) =>
        resp.success
          ? {
              ...resp,
              data: processSections(resp.data)
            }
          : resp
      )
    },
    [{ operation: ApiPermissionClass.StoreCourse, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_STORE_COURSE,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.StoreCourse, action: ApiPermissionAction.Read }]
  ),

  update: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.STORE_COURSE}`,
        method: "POST",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.StoreCourse, action: ApiPermissionAction.Write }]
  )
}

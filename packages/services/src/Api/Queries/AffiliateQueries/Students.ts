import { endpoints } from "~/Api/Queries/AffiliateQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IStudentQueries, processStudents } from "./Proxy/Students"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"

export const StudentQueries: IStudentQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.STUDENT}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processStudents([resp.data])[0] } : resp))
    },
    [{ operation: ApiPermissionClass.Student, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_STUDENT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processStudents(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.Student, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_STUDENT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      }).then((resp) => (resp.success ? { ...resp, data: processStudents(resp.data) } : resp))
    },
    [{ operation: ApiPermissionClass.Student, action: ApiPermissionAction.Read }]
  )
}

import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { ISkillQueries } from "./Proxy/Skills"

export const SkillQueries: ISkillQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.SKILL}/${data!.params!.id}`,
        ...data,
        params,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Skill, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_SKILL,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Skill, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_SKILL,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Skill, action: ApiPermissionAction.Read }]
  ),

  getLookupData: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: endpoints.ALL_SKILL,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Skill, action: ApiPermissionAction.Read }]
  )
}

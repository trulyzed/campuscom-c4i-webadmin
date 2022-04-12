import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IQuestionQueries, processQuestions } from "./Proxy/Questions"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const QuestionQueries:IQuestionQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.QUESTION}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Question, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_QUESTION,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Cart, action: ApiPermissionAction.Read}]),

  getListByCourseProvider: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_PROFILE_QUESTION,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    }).then(resp => resp.success ? {
      ...resp,
      data: processQuestions(resp.data),
    } : resp)
  }, [{operation: ApiPermissionClass.ProfileQuestion, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.QUESTION,
      method: "POST",
      ...data,
    })
  }, [{operation: ApiPermissionClass.Question, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.QUESTION}/${id}`,
      method: "PATCH",
      ...data,
      params
    })
  }, [{operation: ApiPermissionClass.Question, action: ApiPermissionAction.Write}]),

  delete: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_QUESTION}`,
      method: "DELETE",
      ...data
    })
  }, [{operation: ApiPermissionClass.Question, action: ApiPermissionAction.Delete}]),
}
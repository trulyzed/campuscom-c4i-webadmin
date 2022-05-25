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
  }, [{operation: ApiPermissionClass.Question, action: ApiPermissionAction.Read}]),

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

  getProfileQuestionListByStore: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_PROFILE_QUESTION,
      ...data,
      params: {...nonPaginationParams, provider_type: 'store'},
      method: "GET"
    }).then(resp => resp.success ? {
      ...resp,
      data: processQuestions(resp.data),
    } : resp)
  }, [{operation: ApiPermissionClass.ProfileQuestion, action: ApiPermissionAction.Read}]),

  getPaymentQuestionListByStore: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_PAYMENT_QUESTION,
      ...data,
      params: {...nonPaginationParams,},
      method: "GET"
    }).then(resp => resp.success ? {
      ...resp,
      data: processQuestions(resp.data),
    } : resp)
  }, [{operation: ApiPermissionClass.PaymentQuestion, action: ApiPermissionAction.Read}]),

  getRegistrationQuestionListByCourse: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_REGISTRATION_QUESTION,
      ...data,
      params: {entity_type: 'course', ...nonPaginationParams,},
      method: "GET"
    }).then(resp => resp.success ? {
      ...resp,
      data: processQuestions(resp.data),
    } : resp)
  }, [{operation: ApiPermissionClass.RegistrationQuestion, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      configuration: {},
    }
    if (data?.data.autocomplete !== undefined) payload.configuration['autocomplete'] = data?.data?.autocomplete
    if (data?.data.options !== undefined) payload.configuration['options'] = data?.data?.options
    if (data?.data.multiple !== undefined) payload.configuration['multiple'] = data?.data?.multiple
    if (data?.data.max_file_size !== undefined) payload.configuration['max_file_size'] = data?.data?.max_file_size
    if (data?.data.file_types !== undefined) payload.configuration['file_types'] = data?.data?.file_types
    if (data?.data.required !== undefined) payload.configuration['required'] = data?.data?.required
    if (data?.data.default_value !== undefined) payload.configuration['default_value'] = data?.data?.default_value
    if (data?.data.placeholder !== undefined) payload.configuration['placeholder'] = data?.data?.placeholder
    if (data?.data.help_text !== undefined) payload.configuration['help_text'] = data?.data?.help_text

    return adminApi({
      endpoint: endpoints.QUESTION,
      method: "POST",
      ...data,
      data: payload
    })
  }, [{operation: ApiPermissionClass.Question, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const {id, ...params} = data?.params
    const payload = {
      ...data?.data,
      configuration: {},
    }
    if (data?.data.autocomplete !== undefined) payload.configuration['autocomplete'] = data?.data?.autocomplete
    if (data?.data.options !== undefined) payload.configuration['options'] = data?.data?.options
    if (data?.data.multiple !== undefined) payload.configuration['multiple'] = data?.data?.multiple
    if (data?.data.max_file_size !== undefined) payload.configuration['max_file_size'] = data?.data?.max_file_size
    if (data?.data.file_types !== undefined) payload.configuration['file_types'] = data?.data?.file_types
    if (data?.data.required !== undefined) payload.configuration['required'] = data?.data?.required
    if (data?.data.default_value !== undefined) payload.configuration['default_value'] = data?.data?.default_value
    if (data?.data.placeholder !== undefined) payload.configuration['placeholder'] = data?.data?.placeholder
    if (data?.data.help_text !== undefined) payload.configuration['help_text'] = data?.data?.help_text

    return adminApi({
      endpoint: `${endpoints.QUESTION}/${id}`,
      method: "PATCH",
      ...data,
      params,
      data: payload
    })
  }, [{operation: ApiPermissionClass.Question, action: ApiPermissionAction.Write}]),

  delete: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_QUESTION}`,
      method: "DELETE",
      ...data
    })
  }, [{operation: ApiPermissionClass.DeleteQuestion, action: ApiPermissionAction.Delete}]),

  untagProfileQuestion: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_PROFILE_QUESTION}`,
      method: "DELETE",
      ...data
    })
  }, [{operation: ApiPermissionClass.DeleteProfileQuestion, action: ApiPermissionAction.Delete}]),

  untagPaymentQuestion: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_PAYMENT_QUESTION}`,
      method: "DELETE",
      ...data
    })
  }, [{operation: ApiPermissionClass.DeletePaymentQuestion, action: ApiPermissionAction.Delete}]),
}
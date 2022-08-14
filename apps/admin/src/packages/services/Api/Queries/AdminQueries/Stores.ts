import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IStoreQueries } from "./Proxy/Stores"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"
import { parseJSON } from "~/packages/utils/parser"
import { IQueryParams } from "./Proxy/types"

export const StoreQueries:IStoreQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getLookupData: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_STORE,
      ...data,
      method: "GET"
    }).then(resp => resp.success ? ({
      ...resp,
      data: (resp.data as Array<any>).map(i => ({id: i.id, name: i.name}))
    }) : resp)
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Read}]),

  getListByCoursePublishing: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.ALL_COURSE_PUBLISHING_STORE,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.CoursePublishingStore, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = convertToFormData({
      ...data?.data,
      store_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined,
    })
    return adminApi({
      endpoint: endpoints.STORE,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = convertToFormData({
      ...data?.data,
      store_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined,
    })
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.Store, action: ApiPermissionAction.Write}]),

  updateWithoutSlug: PermissionWrapper(data => {
    const payload = convertToFormData({
      ...data?.data,
      store_logo_uri: data?.data.image_file?.length ? data?.data.image_file : undefined,
    })
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_UPDATE}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.StoreUpdate, action: ApiPermissionAction.Write}]),

  tagIdentityProvider: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      catalogs: data?.data.subjects
    }
    return adminApi({
      endpoint: `${endpoints.STORE_IDENTITY_PROVIDER}`,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.StoreIdentityProvider, action: ApiPermissionAction.Write}]),

  untagIdentityProvider: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_STORE_IDENTITY_PROVIDER}`,
      method: "DELETE",
      ...data,
    })
  }, [{operation: ApiPermissionClass.DeleteStoreIdentityProvider, action: ApiPermissionAction.Write}]),

  tagPaymentGateway: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.STORE_PAYMENT_GATEWAY}`,
      method: "POST",
      ...processPaymentGatewayConfigurationPayload(data),
    })
  }, [{operation: ApiPermissionClass.StorePaymentGateway, action: ApiPermissionAction.Write}]),

  untagPaymentGateway: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_STORE_PAYMENT_GATEWAY}`,
      method: "DELETE",
      ...data,
    })
  }, [{operation: ApiPermissionClass.DeleteStorePaymentGateway, action: ApiPermissionAction.Write}]),

  tagConfiguration: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}`,
      method: "POST",
      ...processConfigurationPayload(data),
    })
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Write}]),

  tagProfileQuestion: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      provider_type: 'store',
      provider_ref: data?.data.store,
    }
    return adminApi({
      endpoint: `${endpoints.PROFILE_QUESTION}`,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.ProfileQuestion, action: ApiPermissionAction.Write}]),

  untagProfileQuestion: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_PROFILE_QUESTION}`,
      method: "DELETE",
      ...data,
    })
  }, [{operation: ApiPermissionClass.DeleteProfileQuestion, action: ApiPermissionAction.Delete}]),

  updateConfiguration: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}/${id}`,
      method: "PATCH",
      ...processConfigurationPayload({
        ...data,
        params
      }),
    })
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Write}]),

  tagPaymentQuestion: PermissionWrapper(data => {
    const payload = {
      ...data?.data,
      question_banks: data?.data.question_banks
    }
    return adminApi({
      endpoint: `${endpoints.PAYMENT_QUESTION}`,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.PaymentQuestion, action: ApiPermissionAction.Write}]),
}


const processConfigurationPayload = (data?: IQueryParams): IQueryParams => {
  const payload: {[key: string]: any} = {
    ...data?.data,
    config_value: parseJSON(data?.data.config_value || '{}')
  }

  // email receipt config
  if ('config__email_receipt__header' in payload) {
    payload['config_value'] = {...payload['config_value'], header: payload['config__email_receipt__header']}
    delete payload['config__email_receipt__header']
  }
  if ('config__email_receipt__footer' in payload) {
    payload['config_value'] = {...payload['config_value'], footer: payload['config__email_receipt__footer']}
    delete payload['config__email_receipt__footer']
  }
  if ('config__email_receipt__email_receipt' in payload) {
    payload['config_value'] = {...payload['config_value'], email_receipt: !!payload['config__email_receipt__email_receipt']}
    delete payload['config__email_receipt__email_receipt']
  }

  // checkout config
  if ('config__checkout__enable_purchase_for_myself' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_purchase_for_myself: !!payload['config__checkout__enable_purchase_for_myself']}
    delete payload['config__checkout__enable_purchase_for_myself']
  }
  if ('config__checkout__enable_purchase_for_friends_and_family' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_purchase_for_friends_and_family: !!payload['config__checkout__enable_purchase_for_friends_and_family']}
    delete payload['config__checkout__enable_purchase_for_friends_and_family']
  }
  if ('config__checkout__enable_purchase_for_both' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_purchase_for_both: !!payload['config__checkout__enable_purchase_for_both']}
    delete payload['config__checkout__enable_purchase_for_both']
  }
  if ('config__checkout__enable_purchase_for_company' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_purchase_for_company: !!payload['config__checkout__enable_purchase_for_company']}
    delete payload['config__checkout__enable_purchase_for_company']
  }
  if ('config__checkout__enable_profile_questions' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_profile_questions: !!payload['config__checkout__enable_profile_questions']}
    delete payload['config__checkout__enable_profile_questions']
  }
  if ('config__checkout__enable_registration_questions' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_registration_questions: !!payload['config__checkout__enable_registration_questions']}
    delete payload['config__checkout__enable_registration_questions']
  }
  if ('config__checkout__enable_standalone_product_checkout' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_standalone_product_checkout: !!payload['config__checkout__enable_standalone_product_checkout']}
    delete payload['config__checkout__enable_standalone_product_checkout']
  }
  if ('config__checkout__enable_registration_product_checkout' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_registration_product_checkout: !!payload['config__checkout__enable_registration_product_checkout']}
    delete payload['config__checkout__enable_registration_product_checkout']
  }
  if ('config__checkout__enable_multiple_products_checkout' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_multiple_products_checkout: !!payload['config__checkout__enable_multiple_products_checkout']}
    delete payload['config__checkout__enable_multiple_products_checkout']
  }
  if ('config__checkout__enable_enrollment_for_multiple_students' in payload) {
    payload['config_value'] = {...payload['config_value'], enable_enrollment_for_multiple_students: !!payload['config__checkout__enable_enrollment_for_multiple_students']}
    delete payload['config__checkout__enable_enrollment_for_multiple_students']
  }

  // checkout status config
  if ('config__checkout_status__success_redirect_text' in payload) {
    payload['config_value'] = {...payload['config_value'], success: {...payload['config_value']?.success, redirect_text: payload['config__checkout_status__success_redirect_text']}}
    delete payload['config__checkout_status__success_redirect_text']
  }
  if ('config__checkout_status__success_redirect_url' in payload) {
    payload['config_value'] = {...payload['config_value'], success: {...payload['config_value']?.success, redirect_url: payload['config__checkout_status__success_redirect_url']}}
    delete payload['config__checkout_status__success_redirect_url']
  }
  if ('config__checkout_status__failure_redirect_text' in payload) {
    payload['config_value'] = {...payload['config_value'], failure: {...payload['config_value']?.failure, redirect_text: payload['config__checkout_status__failure_redirect_text']}}
    delete payload['config__checkout_status__failure_redirect_text']
  }
  if ('config__checkout_status__failure_redirect_url' in payload) {
    payload['config_value'] = {...payload['config_value'], failure: {...payload['config_value']?.failure, redirect_url: payload['config__checkout_status__failure_redirect_url']}}
    delete payload['config__checkout_status__failure_redirect_url']
  }

  return {
    ...data,
    data: payload
  }
}

const processPaymentGatewayConfigurationPayload = (data?: IQueryParams): IQueryParams => {
  const payload: {[key: string]: any} = {
    ...data?.data,
    branding: parseJSON(data?.data.branding || '{}')
  }

  // email receipt config
  if ('branding__text' in payload) {
    payload['branding'] = {...payload['branding'], text: payload['branding__text']}
    delete payload['branding__text']
  }
  if ('branding__logo' in payload) {
    payload['branding'] = {...payload['branding'], logo: payload['branding__logo']}
    delete payload['branding__logo']
  }

  return {
    ...data,
    data: payload
  }
}

import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IStoreConfigQueries } from "./Proxy/StoreConfigs"

export const StoreConfigQueries:IStoreConfigQueries = {
  getSingle: PermissionWrapper(data => {
    const { id, ...params } = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}/${id}`,
      method: "GET",
      ...data,
      params
    }).then(resp => resp.success ? ({
      ...resp,
      data: parseConfiguration([resp.data])[0],
    }): resp)
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Write}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.ALL_STORE_CONFIGURATION}`,
      method: "GET",
      ...data,
    }).then(resp => resp.success ? ({
      ...resp,
      data: parseConfiguration(resp.data)
    }): resp)
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Write}]),

  delete: PermissionWrapper(data => {
    const { id, ...payload } = data?.data
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}/${id}`,
      method: "DELETE",
      ...data,
      data: payload
    })
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Delete}]),
}

const parseConfiguration = (data: any[]): any[] => {
  return data.map(i => ({
    ...i,
    config__email_receipt__header: i?.config_value?.['header'],
    config__email_receipt__footer: i?.config_value?.['footer'],
    config__email_receipt__email_receipt: i?.config_value?.['email_receipt'],
    config__checkout__enable_purchase_for_myself: i?.config_value?.['enable_purchase_for_myself'],
    config__checkout__enable_purchase_for_friends_and_family: i?.config_value?.['enable_purchase_for_friends_and_family'],
    config__checkout__enable_purchase_for_both: i?.config_value?.['enable_purchase_for_both'],
    config__checkout__enable_purchase_for_company: i?.config_value?.['enable_purchase_for_company'],
    config__checkout__enable_profile_questions: i?.config_value?.['enable_profile_questions'],
    config__checkout__enable_registration_questions: i?.config_value?.['enable_registration_questions'],
    config__checkout__enable_standalone_product_checkout: i?.config_value?.['enable_standalone_product_checkout'],
    config__checkout__enable_registration_product_checkout: i?.config_value?.['enable_registration_product_checkout'],
    config__checkout__enable_multiple_products_checkout: i?.config_value?.['enable_multiple_products_checkout'],
    config__checkout__enable_enrollment_for_multiple_students: i?.config_value?.['enable_enrollment_for_multiple_students'],
    config__checkout_status__success_redirect_text: i?.config_value?.['success']?.['redirect_text'],
    config__checkout_status__success_redirect_url: i?.config_value?.['success']?.['redirect_url'],
    config__checkout_status__failure_redirect_text: i?.config_value?.['failure']?.['redirect_text'],
    config__checkout_status__failure_redirect_url: i?.config_value?.['failure']?.['redirect_url'],
    config_value: JSON.stringify(i.config_value || undefined),
  }))
}
import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { IStoreQueries } from "./Proxy/Stores"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

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
    const payload = {
      ...data?.data,
      catalogs: data?.data.subjects
    }
    return adminApi({
      endpoint: `${endpoints.STORE_PAYMENT_GATEWAY}`,
      method: "POST",
      ...data,
      data: payload,
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
    const payload = {
      ...data?.data,
      config_value: JSON.parse(data?.data.config_value || undefined)
    }
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}`,
      method: "POST",
      ...data,
      data: payload,
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
    const payload = {
      ...data?.data,
      config_value: JSON.parse(data?.data.config_value || undefined)
    }
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.STORE_CONFIGURATION}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.StoreConfiguration, action: ApiPermissionAction.Write}]),
}

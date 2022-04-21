import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IProductQueries } from "./Proxy/Products"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const ProductQueries:IProductQueries = {
  getSingle: PermissionWrapper(data => {
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.PRODUCT}/${data!.params!.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read}]),

  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_PRODUCT,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.ALL_PRODUCT}`,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = convertToFormData({...data?.data, image: data?.data.image_file?.length ? data?.data.image_file : undefined})
    return adminApi({
      endpoint: endpoints.PRODUCT,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Write}]),

  update: PermissionWrapper(data => {
    const payload = convertToFormData({...data?.data, image: data?.data.image_file?.length ? data?.data.image_file : undefined})
    const {id, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.PRODUCT}/${id}`,
      method: "PATCH",
      ...data,
      data: payload,
      params
    })
  }, [{operation: ApiPermissionClass.Product, action: ApiPermissionAction.Write}]),

  getRelatedProductList: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.RELATED_PRODUCT}`,
      ...data,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.RelatedProduct, action: ApiPermissionAction.Read}]),

  untagRelatedProduct: PermissionWrapper(data => {
    return adminApi({
      endpoint: `${endpoints.DELETE_RELATED_PRODUCT}`,
      method: "DELETE",
      ...data,
    })
  }, [{operation: ApiPermissionClass.DeleteRelatedProduct, action: ApiPermissionAction.Write}]),
}
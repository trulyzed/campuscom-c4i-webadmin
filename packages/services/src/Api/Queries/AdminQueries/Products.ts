import { endpoints } from "~/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/Api/ApiClient"
import { IProductQueries } from "./Proxy/Products"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/Api/Enums/Permission"
import { convertToFormData } from "~/Api/utils/ConvertToFormData"
import { IQueryParams } from "./Proxy/types"
import { parseJSON } from "@packages/utilities/lib/parser"

export const ProductQueries: IProductQueries = {
  getSingle: PermissionWrapper(
    (data) => {
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.PRODUCT}/${data!.params!.id}`,
        ...data,
        params,
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
    [{ operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read }]
  ),

  getPaginatedList: PermissionWrapper(
    (data) => {
      const { pagination, ...nonPaginationParams } = data?.params || {}
      return adminApi({
        endpoint: endpoints.ALL_PRODUCT,
        ...data,
        params: { ...nonPaginationParams },
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read }]
  ),

  getList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.ALL_PRODUCT}`,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.Product, action: ApiPermissionAction.Read }]
  ),

  create: PermissionWrapper(
    (data) => {
      data = { ...processConfigurationPayload(data) }
      const payload = convertToFormData({ ...data?.data, image: data?.data.image_file?.length ? data?.data.image_file : undefined })
      return adminApi({
        endpoint: endpoints.PRODUCT,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.Product, action: ApiPermissionAction.Write }]
  ),

  update: PermissionWrapper(
    (data) => {
      data = { ...processConfigurationPayload(data) }
      const payload = convertToFormData({ ...data?.data, image: data?.data.image_file?.length ? data?.data.image_file : undefined })
      const { id, ...params } = data?.params
      return adminApi({
        endpoint: `${endpoints.PRODUCT}/${id}`,
        method: "PATCH",
        ...data,
        data: payload,
        params
      })
    },
    [{ operation: ApiPermissionClass.Product, action: ApiPermissionAction.Write }]
  ),

  getRelatedProductList: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.RELATED_PRODUCT}`,
        ...data,
        method: "GET"
      })
    },
    [{ operation: ApiPermissionClass.RelatedProduct, action: ApiPermissionAction.Read }]
  ),

  tagRelatedProducts: PermissionWrapper(
    (data) => {
      const payload = {
        ...data?.data,
        product: data?.data.product
      }

      return adminApi({
        endpoint: `${endpoints.RELATED_PRODUCT}`,
        method: "POST",
        ...data,
        data: payload
      })
    },
    [{ operation: ApiPermissionClass.RelatedProduct, action: ApiPermissionAction.Write }]
  ),

  untagRelatedProduct: PermissionWrapper(
    (data) => {
      return adminApi({
        endpoint: `${endpoints.DELETE_RELATED_PRODUCT}`,
        method: "DELETE",
        ...data
      })
    },
    [{ operation: ApiPermissionClass.DeleteRelatedProduct, action: ApiPermissionAction.Write }]
  )
}

const processConfigurationPayload = (data?: IQueryParams): IQueryParams => {
  const payload: { [key: string]: any } = {
    ...data?.data,
    content: parseJSON(data?.data.content || "{}")
  }

  if ("content__title" in payload) {
    payload["content"] = { ...payload["content"], title: payload["content__title"] }
    delete payload["content__title"]
  }
  if ("content__image" in payload) {
    payload["content"] = { ...payload["content"], image: payload["content__image"] }
    delete payload["content__image"]
  }

  return {
    ...data,
    data: payload
  }
}

const parseConfiguration = (data: any[]): any[] => {
  return data.map((i) => ({
    ...i,
    content__title: i?.content?.["title"],
    content__image: i?.content?.["image"]
  }))
}

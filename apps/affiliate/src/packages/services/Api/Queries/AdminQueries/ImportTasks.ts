import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IImportTaskQueries } from "./Proxy/ImportTasks"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"
import { convertToFormData } from "~/packages/services/Api/utils/ConvertToFormData"

export const ImportTaskQueries:IImportTaskQueries = {
  getPaginatedList: PermissionWrapper(data => {
    const { pagination, ...nonPaginationParams } = data?.params || {};
    return adminApi({
      endpoint: endpoints.ALL_IMPORT_TASK,
      ...data,
      params: {...nonPaginationParams},
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.ImportTask, action: ApiPermissionAction.Read}]),

  getList: PermissionWrapper(data => {
    const { id, ...params } = data?.params || {};
    return adminApi({
      endpoint: `${endpoints.ALL_IMPORT_TASK}/${data?.params.id}`,
      ...data,
      params,
      method: "GET"
    })
  }, [{operation: ApiPermissionClass.ImportTask, action: ApiPermissionAction.Read}]),

  create: PermissionWrapper(data => {
    const payload = convertToFormData({
      ...data?.data,
      filename: data?.data.filename?.length ? data?.data.filename : undefined,
    })
    return adminApi({
      endpoint: endpoints.IMPORT_TASK,
      method: "POST",
      ...data,
      data: payload,
    })
  }, [{operation: ApiPermissionClass.ImportTask, action: ApiPermissionAction.Write}]),

  requeue: PermissionWrapper(data => {
    return adminApi({
      endpoint: endpoints.REQUEUE_IMPORT,
      method: "POST",
      ...data,
    })
  }, [{operation: ApiPermissionClass.RequeueImport, action: ApiPermissionAction.Write}]),
}
import { endpoints } from "~/packages/services/Api/Queries/AdminQueries/Endpoints"
import { adminApi } from "~/packages/services/Api/ApiClient"
import { IAttachmentQueries } from "./Proxy/Attachments"
import { PermissionWrapper } from "./Proxy"
import { ApiPermissionAction, ApiPermissionClass } from "~/packages/services/Api/Enums/Permission"

export const AttachmentQueries:IAttachmentQueries = {
  download: PermissionWrapper(data => {
    const {filename, ...params} = data?.params;
    return adminApi({
      endpoint: `${endpoints.ATTACHMENT_DOWNLOAD}/${filename}`,
      ...data,
      params,
      responseType: 'blob',
      method: "GET"
    }).then(async resp => {
      if (resp.success) {
        const data = await resp.data
        const objectURL = URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        link.href = objectURL
        link.setAttribute('download', filename)
        link.click()
        link.remove()
      }
      return resp
    })
  }, [{operation: ApiPermissionClass.AttachmentDownload, action: ApiPermissionAction.Read}]),
}
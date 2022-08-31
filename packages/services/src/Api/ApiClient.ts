import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { getToken } from "~/Api/utils/TokenStore"
import { IApiResponse } from "~/Api/utils/Interfaces"
import { handleTrailingSlashAppend } from "~/Api/utils/TrailingSlash"
import { handleError } from "~/Api/utils/HandleResponse"
import { saveAs } from "file-saver"

//type ResponseType = "list" | "retrieve" | "create" | "update" | "delete" | "other"

interface IRequestConfig {
  endpoint: string
  method?: AxiosRequestConfig["method"]
  params?: AxiosRequestConfig["params"]
  data?: AxiosRequestConfig["data"]
  headers?: AxiosRequestConfig["headers"]
  responseType?: AxiosRequestConfig["responseType"]
  filename?: string
}

export const adminApi = async (requestConfig: IRequestConfig): Promise<IApiResponse> => {
  // const userString = localStorage.getItem("user")
  const token = getToken()

  try {
    const response = await axios.request({
      method: requestConfig.method,
      data: requestConfig.data,
      params: requestConfig.params,
      responseType: requestConfig.headers?.ResponseType === "application/vnd.ms-excel" || requestConfig.headers?.ResponseType === "text/csv" ? "blob" : requestConfig.responseType,
      url: `${process.env.REACT_APP_API_ROOT}${handleTrailingSlashAppend(requestConfig.endpoint, true)}`,
      headers: {
        ...requestConfig.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })
    const contentType = response.headers?.["content-type"]

    if (contentType === "text/csv" || contentType === "application/vnd.ms-excel") {
      const filename = `${requestConfig.filename || "report"}-${new Date().toISOString()}`
      const extension = contentType === "text/csv" ? ".csv" : ".xls"
      saveAs(response.data, `${filename}${extension}`)
      return { data: response, success: true, code: 200, error: null }
    }

    return {
      code: response.status,
      success: true,
      data: response.data.data ? response.data.data : response.data,
      error: response.statusText
    }
  } catch (error) {
    return handleError(error as AxiosError)
  }
}

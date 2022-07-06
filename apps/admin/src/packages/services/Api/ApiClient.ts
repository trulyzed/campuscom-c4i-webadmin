import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { getToken } from "~/packages/services/Api/utils/TokenStore"
import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { handleTrailingSlashAppend } from "~/packages/services/Api/utils/TrailingSlash"
import { handleError } from "~/packages/services/Api/utils/HandleResponse"
import { saveAs } from "file-saver"

//type ResponseType = "list" | "retrieve" | "create" | "update" | "delete" | "other"


interface IRequestConfig {
  endpoint: string
  method?: AxiosRequestConfig['method']
  params?: AxiosRequestConfig['params']
  data?: AxiosRequestConfig['data']
  headers?: AxiosRequestConfig['headers']
  responseType?: AxiosRequestConfig['responseType']
}

export const adminApi = async (requestConfig: IRequestConfig): Promise<IApiResponse> => {
  // const userString = localStorage.getItem("user")
  const token = getToken()

  try {
    const response = await axios.request({
      method: requestConfig.method,
      data: requestConfig.data,
      params: requestConfig.params,
      responseType: (requestConfig.headers?.ResponseType === "application/vnd.ms-excel" || requestConfig.headers?.ResponseType === "text/csv") ? "blob" : requestConfig.responseType,
      url: `${process.env.REACT_APP_API_ROOT}${handleTrailingSlashAppend(requestConfig.endpoint, true)}`,
      headers: {
        ...requestConfig.headers,
        ...token && {Authorization: `Bearer ${token}`},
      }
    })

    switch (requestConfig.headers?.ResponseType) {
      case "text/csv":
        saveAs(response.data, `report-${new Date().toISOString()}.csv`)
        return { data: response, success: true, code: 200, error: null }
      case "application/vnd.ms-excel":
        saveAs(response.data, `report-${new Date().toISOString()}.xls`)
        return { data: response, success: true, code: 200, error: null }
      }

    return {
      code: response.status,
      success: true,
      data: response.data.data ? response.data.data : response.data,
      error: response.statusText,
    }
  } catch (error) {
    return handleError(error as AxiosError);
  }
}
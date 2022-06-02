import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { getToken } from "~/packages/services/Api/utils/TokenStore"
import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { handleTrailingSlashAppend } from "~/packages/services/Api/utils/TrailingSlash"
import { handleError } from "~/packages/services/Api/utils/HandleResponse"

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
      url: `${process.env.REACT_APP_API_ROOT}${handleTrailingSlashAppend(requestConfig.endpoint, true)}`,
      ...(token && { headers: { Authorization: `Bearer ${token}` } })
    })

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
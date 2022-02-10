import { setLoginInfo, setUser } from "../utils/TokenStore"
import { IApiResponse } from "../utils/Interfaces"
import { baseURL } from "../utils/ApiMethodFactory"
import { handleResponse } from "../utils/HandleResponse"
import axios, { AxiosRequestConfig } from "axios"

export function CallPublicApi(Params: { url: string; data?: any; headers?: { [key: string]: any } }): Promise<IApiResponse> {
  const requestConfig: AxiosRequestConfig = {
    baseURL,
    url: Params.url,
    method: "POST",
    data: Params.data,
    headers: Params.headers
  }
  requestConfig.withCredentials = true
  return handleResponse(axios.request(requestConfig))
}

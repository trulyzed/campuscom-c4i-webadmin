import axios, { AxiosRequestConfig } from "axios"
import { getToken } from "@packages/api/lib/utils/TokenStore"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { APPEND_TRAILING_SLASH_IN_ENDPOINT } from "~/Configs/main"

//type ResponseType = "list" | "retrieve" | "create" | "update" | "delete" | "other"


interface IRequestConfig {
  endpoint: string
  method?: AxiosRequestConfig['method']
  params?: AxiosRequestConfig['params']
  data?: AxiosRequestConfig['data']
  //responseType: ResponseType
}

export const CallApi = async (requestConfig: IRequestConfig): Promise<IApiResponse> => {
  // const userString = localStorage.getItem("user")
  const token = getToken()

  try {
    const response = await axios.request({
      method: requestConfig.method,
      data: requestConfig.data,
      params: requestConfig.params,
      url: `${process.env.REACT_APP_API_ROOT}${handleTrailingSlashAppend(requestConfig.endpoint)}`,
      ...(token && { headers: { Authorization: `Bearer ${token}` } })
    })

    return {
      code: response.status,
      success: true,
      data: response.data.data ? response.data.data : response.data,
      error: response.statusText,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        code: error.response.status,
        success: false,
        data: null,
        error: error.response.data?.errors || error.response.statusText,
      }
    } else {
      throw error;
    }
  }
}


 export const handleTrailingSlashAppend = (endpoint='', appendTrailingSlash=APPEND_TRAILING_SLASH_IN_ENDPOINT): string => {
  if (!endpoint) return '';
  const splitted = endpoint.split('?');
  const hasQueryParam = splitted.length > 1;
  const onlyEndpoint = splitted[0];
  const queryParam = hasQueryParam && `?${splitted[1]}` || '';
  const slash = appendTrailingSlash && !onlyEndpoint.endsWith('/') && '/' || '';

  return `${onlyEndpoint}${slash}${queryParam}`;
}
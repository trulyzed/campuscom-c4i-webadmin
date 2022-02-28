import axios from "axios"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { getToken } from "@packages/api/lib/utils/TokenStore"
interface IRequestConfig {
  url: string
  data: any
  method: "get" | "post" | "patch" | "delete"
}

export const CallApi = (requestConfig: IRequestConfig): Promise<any> => {
  // const userString = localStorage.getItem("user")
  const token = getToken()

  return axios
    .request({
      ...requestConfig,
      url: `${process.env.REACT_APP_API_ROOT}${requestConfig.url}/${
        requestConfig.data && requestConfig.method === "get" ? objectToQueryString(requestConfig.data) : ""
      }`,
      ...(token && { headers: { Authorization: `Bearer ${token}` } })
    })
    .then((response) => {
      return response.data
    })
}

import { setLoginInfo, setUser } from "../utils/TokenStore"
import { IApiResponse } from "../utils/Interfaces"
import { baseURL } from "../utils/ApiMethodFactory"
import { handleResponse } from "../utils/HandleResponse"
import axios, { AxiosRequestConfig } from "axios"

export async function login(UserName: string, UserPassword: string): Promise<IApiResponse> {
  const requestConfig: AxiosRequestConfig = {
    baseURL,
    url: `api/login?UserName=${UserName}&UserPassword=${UserPassword}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  requestConfig.withCredentials = true
  const response: IApiResponse = await handleResponse(axios.request(requestConfig))
  if (response && response.success) {
    setLoginInfo({ token: response.data["token"], userName: UserName })
    setUser(response.data["profile"])
  }
  return response
}

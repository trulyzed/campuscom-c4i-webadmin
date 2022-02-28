import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
// import { getRefreshToken } from "./TokenStore"

export async function getNewAccessToken(): Promise<string> {
  const requestConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    data: {
      // RefreshToken: getRefreshToken()
    }
  }

  let response: AxiosResponse
  let token = ""
  try {
    response = await axios.request(requestConfig)
    token = response.data["access_token"]
  } catch (error) {
    if (error["code"] === 401) {
    }
  }

  return token
}

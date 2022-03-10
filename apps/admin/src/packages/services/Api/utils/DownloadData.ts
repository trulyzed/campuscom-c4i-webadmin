import axios, { AxiosRequestConfig } from "axios"
import { ApiConfig, IApiResponse, RESPONSE_TYPE } from "./Interfaces"

const getNewConfigWithResponseType = (config: ApiConfig): { newConfig: ApiConfig; fileExtension: string } => {
  let header: { [key: string]: any }
  let fileExtension = ""
  const Params = config.data.Params

  if (Params[RESPONSE_TYPE.EXCEL] || (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.EXCEL])) {
    if (Params[RESPONSE_TYPE.EXCEL]) delete Params[RESPONSE_TYPE.EXCEL]
    else if (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.EXCEL]) delete Params[0][RESPONSE_TYPE.EXCEL]
    header = {
      "ResponseType": "application/vnd.ms-excel"
    }
    fileExtension = ".xls"
  } else if (Params[RESPONSE_TYPE.CSV] || (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.CSV])) {
    if (Params[RESPONSE_TYPE.CSV]) delete Params[RESPONSE_TYPE.CSV]
    else if (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.CSV]) delete Params[0][RESPONSE_TYPE.CSV]
    header = {
      "ResponseType": "text/csv"
    }
    fileExtension = ".csv"
  } else if (Params[RESPONSE_TYPE.PDF] || (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.PDF])) {
    if (Params[RESPONSE_TYPE.PDF]) delete Params[RESPONSE_TYPE.PDF]
    else if (Array.isArray(Params) && Params[0] && Params[0][RESPONSE_TYPE.PDF]) delete Params[0][RESPONSE_TYPE.PDF]
    header = {
      "ResponseType": "application/pdf"
    }
  } else header = {}

  return {
    newConfig: {
      ...config,
      headers: {
        ...config.headers,
        ...header
      },
      responseType: "blob"
    },
    fileExtension
  }
}

export async function preview(config: ApiConfig): Promise<IApiResponse> {
  const { newConfig } = getNewConfigWithResponseType(config)

  const requestConfig: AxiosRequestConfig = newConfig as AxiosRequestConfig
  requestConfig.withCredentials = true
  const response = (await axios.request(requestConfig)).data

  return { data: response, success: true, code: 200, error: null }
}

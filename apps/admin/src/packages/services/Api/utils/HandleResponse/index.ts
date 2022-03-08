import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { AxiosError } from "axios"
import ProcessedApiError, { ISimplifiedApiErrorMessage } from "./ProcessedApiError"
import { eventBus } from "@packages/utilities/lib/EventBus"

export const handleError = (error: AxiosError): IApiResponse => {
  let response: IApiResponse = {
    code: 503,
    error: undefined,
    data: undefined,
    success: false
  }
  if (error.isAxiosError && error && error.response) {
    if (error.response.data && typeof error.response.data !== "string") {
      response = {
        code: error.response.data["status_code"],
        error: error.response.data["error"],
        data: error.response.data["data"],
        success: false
      }
    } else {
      response = {
        code: error.response.status,
        error: error.response.data,
        data: null,
        success: false
      }
    }
  }
  response.error = new ProcessedApiError(response.error, response.code).getErrorMessages()
  response.error.forEach((err: ISimplifiedApiErrorMessage) => {
    if (err.isGloabal) {
      eventBus.publish(HANDLE_GLOBAL_API_ERROR, [err])
    }
  })
  return response
}

export const HANDLE_GLOBAL_API_ERROR = Symbol("HANDLE_GLOBAL_API_ERROR")

import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { AxiosError } from "axios"
import ApiErrorProcessor, { ISimplifiedApiErrorMessage } from "./ApiErrorProcessor"
import { eventBus } from "~/packages/utils/EventBus"

export const handleError = (error: AxiosError): IApiResponse => {
  const response: IApiResponse = {
    code: 503,
    error: undefined,
    data: undefined,
    success: false
  }
  if (error.isAxiosError && error?.response) {
    if (typeof error.response.data !== "string") {
      response.error = error.response.data;
      response.code = error.response.data["status_code"];
    } else {
      response.code = error.response.status;
    }
  }
  response.error = new ApiErrorProcessor(response.error, response.code).getErrorMessages()
  response.error.forEach((err: ISimplifiedApiErrorMessage) => {
    if (err.isGlobal) {
      eventBus.publish(HANDLE_GLOBAL_API_ERROR, [err])
    }
  })
  return response
}

export const HANDLE_GLOBAL_API_ERROR = Symbol("HANDLE_GLOBAL_API_ERROR")

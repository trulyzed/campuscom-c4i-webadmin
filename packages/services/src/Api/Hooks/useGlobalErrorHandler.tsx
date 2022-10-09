import { useEffect } from "react"
import { ISimplifiedApiErrorMessage } from "~/Api/utils/HandleResponse/ApiErrorProcessor"
import { HANDLE_GLOBAL_API_ERROR } from "~/Api/utils/HandleResponse"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { SHOW_LOGIN_MODAL } from "@packages/utilities/lib/Constants"

export const useGlobalErrorHandler = () => {
  useEffect(() => {
    eventBus.subscribe(HANDLE_GLOBAL_API_ERROR, (errors: Array<ISimplifiedApiErrorMessage> | undefined) => {
      if (errors && Array.isArray(errors)) {
        errors.forEach((x) => {
          if (x.code === 401 && window.location.pathname !== "/login") {
            eventBus.publish(SHOW_LOGIN_MODAL, true)
          }
        })
      }
    })
  }, [])
  return null
}

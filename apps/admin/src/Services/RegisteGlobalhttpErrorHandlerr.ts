import { HANDLE_GLOBAL_API_ERROR } from "@packages/api/lib/utils/HandleResponse"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { NEW_BUILD_AVAILABL } from "@packages/api/lib/utils/TokenStore"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { SHOW_LOGIN_MODAL } from "~/Constants"
import { logout } from "~/Services/AuthService"

export function RegisteGlobalhttpErrorHandlerr() {
  eventBus.subscribe(HANDLE_GLOBAL_API_ERROR, (errors: Array<ISimplifiedApiErrorMessage> | undefined) => {
    if (errors && Array.isArray(errors)) {
      errors.forEach((x) => {
        if (x.code === 426 && x.message === NEW_BUILD_AVAILABL) logout()
        else if (x.code === 401) {
          eventBus.publish(SHOW_LOGIN_MODAL, true)
        }
      })
    }
  })
}

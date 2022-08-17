import { cleanStorage } from "~/Api/utils/TokenStore"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "@packages/utilities/lib/Constants"
import { AuthQueries } from "~/Api/Queries/AdminQueries/Auth"
import { IApiResponse } from "./Api/utils/Interfaces"

export const logout = () => {
  cleanStorage()
  eventBus.publish(REDIRECT_TO_LOGIN, true)
}

export const login = async ({ username, password }: { username: string; password: string }): Promise<IApiResponse> => {
  return AuthQueries.login({ data: { username, password } }).then((resp) => {
    if (resp && resp.success) {
      setTimeout(() => {
        eventBus.publishSimilarEvents(/REFRESH.*/i)
        eventBus.publish(SHOW_LOGIN_MODAL, false)
        eventBus.publish(REDIRECT_TO_LOGIN, false)
      }, 0)
    }
    return resp
  })
}

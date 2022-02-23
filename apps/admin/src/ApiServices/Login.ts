// import { login as loginService } from "@packages/api/lib/Login"
import { cleanStorage, setLoginInfo } from "@packages/api/lib/utils/TokenStore"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"
// import { getAboutInfo } from "~/ApiServices/Service/AboutService"
import { Apis } from "./Apis"
import { endpoints } from "./Endpoints"

export async function login(username: string, password: string): Promise<IApiResponse> {
  // const lastUserName ()
  const response = await Apis[endpoints.LOGIN]({ username, password })
  if (response) {
    setLoginInfo({ token: response.access, userName: "" })
    setTimeout(() => {
      eventBus.publishSimilarEvents(/REFRESH.*/i)
      eventBus.publish(SHOW_LOGIN_MODAL, false)
      eventBus.publish(REDIRECT_TO_LOGIN, false)
    }, 0)
  }
  return response
}

export function logout(): void {
  cleanStorage()
  eventBus.publish(REDIRECT_TO_LOGIN, true)
}

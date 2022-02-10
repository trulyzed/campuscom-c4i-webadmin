import { login as loginService } from "@packages/api/lib/Login"
import { cleanStorage, getUsername, setAboutInfo } from "@packages/api/lib/utils/TokenStore"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"
import { getAboutInfo } from "~/ApiServices/Service/AboutService"

export async function login(UserName: string, UserPassword: string): Promise<IApiResponse> {
  const lastUserName = getUsername()
  const response = await loginService(UserName, UserPassword)
  if (response && response.success) {
    const aboutInfo = await getAboutInfo({})
    if (aboutInfo && aboutInfo.success) {
      setAboutInfo({ schoolName: aboutInfo.data.SchoolCode.name, version: aboutInfo.data.BuildVersion })
    }

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

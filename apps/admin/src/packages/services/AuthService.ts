import { cleanStorage } from "~/packages/services/Api/utils/TokenStore"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { REDIRECT_TO_LOGIN } from "~/Constants"

export const logout = () => {
  cleanStorage()
  eventBus.publish(REDIRECT_TO_LOGIN, true)
}
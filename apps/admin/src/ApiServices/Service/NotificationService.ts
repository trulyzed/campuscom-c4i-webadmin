import NotificationlService, { config } from "@packages/api/lib/Proxy/Admin/Service/NotificationService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function sendEmail(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return NotificationlService[config.Actions.sendEmail](Params, Headers)
}

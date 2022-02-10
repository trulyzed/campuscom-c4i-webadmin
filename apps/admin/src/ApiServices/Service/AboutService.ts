import AboutService, { config } from "@packages/api/lib/Proxy/Admin/Service/AboutService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getAboutInfo(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return AboutService[config.Actions.getAboutInfo](Params, Headers)
}

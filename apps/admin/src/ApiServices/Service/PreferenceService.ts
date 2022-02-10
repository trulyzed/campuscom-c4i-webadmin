import PreferenceService, { config } from "@packages/api/lib/Proxy/Admin/Service/PreferenceService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getPreferences(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PreferenceService[config.Actions.getPreferences](Params, Headers)
}

export function saveOrUpdatePreferences(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PreferenceService[config.Actions.saveOrUpdatePreferences](Params, Headers)
}

export function deletePreferences(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PreferenceService[config.Actions.deletePreferences](Params, Headers)
}

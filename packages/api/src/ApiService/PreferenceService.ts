import PreferenceService, { config } from "../Proxy/Admin/Service/PreferenceService"
import { IApiResponse } from "../utils/Interfaces"

export function getPreferences(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PreferenceService[config.Actions.getPreferences](Params, Headers)
}

export function saveOrUpdatePreferences(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PreferenceService[config.Actions.saveOrUpdatePreferences](Params, Headers)
}

export function deletePreferences(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PreferenceService[config.Actions.deletePreferences](Params, Headers)
}

import SectionService, { config } from "@packages/api/lib/Proxy/Admin/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findSectionInfoBySectionID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.findSectionInfoBySectionID](Params, Headers)
}

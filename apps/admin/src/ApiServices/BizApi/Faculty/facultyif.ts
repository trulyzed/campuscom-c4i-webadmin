import FacultyIf, { config } from "@packages/api/lib/Proxy/Admin/BizApi/faculty/facultyIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findSectionRoster(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FacultyIf[config.Actions.findSectionRoster]([Params.SectionID, Params.FacultyID], Headers)
}

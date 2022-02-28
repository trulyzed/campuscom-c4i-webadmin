import GradingService, { config } from "@packages/api/lib/Proxy/Admin/Service/GradingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function submitFinalGrade(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return GradingService[config.Actions.submitFinalGrade](Params, Headers)
}

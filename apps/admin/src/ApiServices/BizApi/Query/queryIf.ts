import QueryIf, { config } from "@packages/api/lib/Proxy/Admin/BizApi/query/queryIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { MAX_PAGE_SIZE, MIN_START_POSITION_SIZE } from "~/Constants"

export function findMySchedule(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.person.findMySchedule",
      {
        InstructorSchedule: 1,
        CurrentSchedule: 1,
        FacultyID: Params.FacultyID
      },
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findFacultySections(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.faculty.section.findFacultySections",
      {
        FacultyID: Params.FacultyID,
        isCompletedSection: Params.isCompletedSection,
        SectionStatusCodeID: Params.SectionStatusCodeID
      },
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function SectionMeetingScheduleReport(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeRowMapNamedQuery](
    ["jxntm.course.SectionMeetingScheduleReport", Params, Headers ? Headers.PageSize : MAX_PAGE_SIZE],
    Headers
  )
}

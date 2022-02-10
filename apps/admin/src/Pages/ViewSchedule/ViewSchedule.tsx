import React from "react"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getFindMyScheduleTableColumns } from "~/TableSearchMeta/Home/FindMyScheduleTableColumns"
import { getUser } from "@packages/api/lib/utils/TokenStore"

export const ViewSchedule = () => {
  const Faculty: any = getUser()
  return <SearchPage initSearchAtMount defaultFormValue={{ Faculty: Faculty.FacultyID }} title={"Upcoming Classes"} tableProps={{ ...getFindMyScheduleTableColumns() }} />
}

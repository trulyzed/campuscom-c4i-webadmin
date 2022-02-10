import { SectionMeetingScheduleReport } from "~/ApiServices/BizApi/Query/queryIf"
import { TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"

export const getSectionScheduleTableColumns = (isModal = false): ITableMeta => {
  const columns: TableColumnType = [
    {
      title: "Start Date",
      dataIndex: "StartDate"
    },
    {
      title: "End Date",
      dataIndex: "EndDate"
    },
    {
      title: "Start Time",
      dataIndex: "StartTime"
    },
    {
      title: "End Time",
      dataIndex: "EndTime"
    },
    {
      title: "Meeting Type",
      dataIndex: "MeetingType"
    },
    {
      title: "Location",
      dataIndex: "Location"
    }
  ]

  return { columns, searchFunc: SectionMeetingScheduleReport, tableName: "SectionScheduleTableColumns" }
}

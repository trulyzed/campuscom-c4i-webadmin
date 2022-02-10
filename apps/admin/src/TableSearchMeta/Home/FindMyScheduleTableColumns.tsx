import { findMySchedule } from "~/ApiServices/BizApi/Query/queryIf"
import { renderDate, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"

export const getFindMyScheduleTableColumns = (isModal = false): ITableMeta => {
  const columns: TableColumnType = [
    {
      title: "Date",
      dataIndex: "StartDate",
      render: renderDate
    },
    {
      title: "Time",
      render: (text: any, record: any) => `${record.StartTime} - ${record.EndTime}`
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName"
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber"
    },
    {
      title: "Location",
      dataIndex: "Location"
    },
    {
      title: "Meeting Type",
      dataIndex: "MeetingType"
    }
  ]

  return { columns, searchFunc: findMySchedule, tableName: "FindMyScheduleTableColumns" }
}

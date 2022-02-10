import moment from "moment"
import { findFacultySections } from "~/ApiServices/BizApi/Query/queryIf"
import { renderDetailsLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { DATE_FORMAT } from "~/Constants"

export const getCompletedSectionsTableColumns = (isModal = false): ITableMeta => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) => renderDetailsLink(`/completed-sections/${record.SectionID}`)
    },
    {
      title: "Name",
      dataIndex: "OfferingName"
    },
    {
      title: "Start/End",
      render: (text: any, record: any) => (record.StartDate && record.EndDate ? `${moment(record.StartDate).format(DATE_FORMAT)} - ${moment(record.EndDate).format(DATE_FORMAT)}` : "")
    },
    {
      title: "Offering Code",
      dataIndex: "OfferingCode"
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber"
    }
  ]

  return { columns, searchFunc: findFacultySections, tableName: "CompletedSectionsTableColumns" }
}

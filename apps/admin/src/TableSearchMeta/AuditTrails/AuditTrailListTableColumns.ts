import { renderDateTime, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { AuditTrailQueries } from "~/packages/services/Api/Queries/AdminQueries/AuditTrails"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const auditTrailListTableColumns: TableColumnType = [
  {
    title: "Ref Id",
    dataIndex: "ref_id",
    render: (text: any, record: any) => renderLink(`/administration/audit-trail/${record.id}`, text),
    sorter: (a: any, b: any) => a.ref_id - b.ref_id
  },
  {
    title: "Narration",
    dataIndex: "narration",
    sorter: (a: any, b: any) => a.narration - b.narration
  },
  {
    title: "Source",
    dataIndex: "source",
    sorter: (a: any, b: any) => a.source - b.source
  },
  {
    title: "Time",
    dataIndex: "when",
    render: renderDateTime,
    sorter: (a: any, b: any) => a.when - b.when,
  },
]

export const getAuditTrailListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: auditTrailListTableColumns,
    searchFunc: QueryConstructor((params) => AuditTrailQueries.getPaginatedList(params), [AuditTrailQueries.getList]),
    tableName: 'AuditTrail'
  }
}

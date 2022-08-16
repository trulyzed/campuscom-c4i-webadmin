import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Audit Trails"}
      meta={AuditTrailSearchMeta}
      tableProps={{
        ...getAuditTrailListTableColumns(),
      }}
    />
  )
}

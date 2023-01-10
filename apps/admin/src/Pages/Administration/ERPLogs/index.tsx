import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getERPLogListTableColumns } from "~/TableSearchMeta/ERPLog/ERPLogListTableColumns"
import { ERPLogSearchMeta } from "~/TableSearchMeta/ERPLog/ERPLogSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"ERP Logs"}
      meta={ERPLogSearchMeta}
      tableProps={{
        ...getERPLogListTableColumns(),
      }}
    />
  )
}

import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getTransactionReportListTableColumns } from "~/TableSearchMeta/TransactionReport/TransactionReportListTableColumns"
import { TransactionReportSearchMeta } from "~/TableSearchMeta/TransactionReport/TransactionReportSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Detail Reports"}
      meta={TransactionReportSearchMeta}
      tableProps={getTransactionReportListTableColumns()}
    />
  )
}

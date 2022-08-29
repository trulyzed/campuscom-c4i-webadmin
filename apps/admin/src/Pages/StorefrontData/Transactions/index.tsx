import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getTransactionListTableColumns } from "~/TableSearchMeta/Transaction/TransactionListTableColumns"
import { TransactionSearchMeta } from "~/TableSearchMeta/Transaction/TransactionSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Transaction Reports"}
      meta={TransactionSearchMeta}
      tableProps={getTransactionListTableColumns()}
    />
  )
}

import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getTransactionListTableColumns } from "~/TableSearchMeta/Transaction/TransactionListTableColumns"
import { TransactionSearchMeta } from "~/TableSearchMeta/Transaction/TransactionSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Transactions"}
      meta={TransactionSearchMeta}
      tableProps={getTransactionListTableColumns()}
    />
  )
}

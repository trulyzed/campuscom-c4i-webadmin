import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { TransactionSearchMeta } from "~/TableSearchMeta/Transaction/TransactionSearchMeta"
import { getTransactionListTableColumns } from "~/TableSearchMeta/Transaction/TransactionListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"

export const List = () => {
  return (
    <SearchPage
      title={"Settled Transactions"}
      meta={TransactionSearchMeta}
      tableProps={{
        ...getTransactionListTableColumns(),
        searchFunc: QueryConstructor((data) => TransactionQueries.getList({ ...data, params: { ...data?.params, settlement_status: "settled", payment_transactions__status: "completed" } }), [TransactionQueries.getList]),
      }}
    />
  )
}

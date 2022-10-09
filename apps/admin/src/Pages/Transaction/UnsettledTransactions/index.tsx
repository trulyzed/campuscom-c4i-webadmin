import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { NavigateTo } from "@packages/components/lib/Actions/NavigateTo"
import { TransactionSearchMeta } from "~/TableSearchMeta/Transaction/TransactionSearchMeta"
import { getTransactionListTableColumns } from "~/TableSearchMeta/Transaction/TransactionListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"

export const List = () => {
  return (
    <SearchPage
      title={"Unsettled Transactions"}
      meta={TransactionSearchMeta}
      tableProps={{
        ...getTransactionListTableColumns(),
        searchFunc: QueryConstructor((data) => TransactionQueries.getList({ ...data, params: { ...data?.params, settlement_status: "unsettled", payment_transactions__status: "completed" } }), [TransactionQueries.getList]),
        actions: [
          <NavigateTo type="create" name="Create Settlement Batch" path="/transaction/create-settlement-batch" apiPermission={TransactionBatchQueries.create} />
        ]
      }}
    />
  )
}

import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getTransactionBatchListTableColumns } from "~/TableSearchMeta/TransactionBatch/TransactionBatchListTableColumns"
import { TransactionBatchSearchMeta } from "~/TableSearchMeta/TransactionBatch/TransactionBatchSearchMeta"
import { NavigateTo } from "@packages/components/lib/Actions/NavigateTo"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"

export const List = () => {
  return (
    <SearchPage
      title={"Settlement Batches"}
      meta={TransactionBatchSearchMeta}
      tableProps={{
        ...getTransactionBatchListTableColumns(),
        actions: [
          <NavigateTo type="create" name="Create Settlement Batch" path="/transaction/create-settlement-batch" apiPermission={TransactionBatchQueries.create} />
        ]
      }}
    />
  )
}

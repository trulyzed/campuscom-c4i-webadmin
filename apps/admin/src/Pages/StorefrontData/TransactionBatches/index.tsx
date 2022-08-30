import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getTransactionBatchListTableColumns } from "~/TableSearchMeta/TransactionBatch/TransactionBatchListTableColumns"
import { TransactionBatchSearchMeta } from "~/TableSearchMeta/TransactionBatch/TransactionBatchSearchMeta"
import { NavigateTo } from "@packages/components/lib/Actions/NavigateTo"

export const List = () => {
  return (
    <SearchPage
      title={"Settlement Batches"}
      meta={TransactionBatchSearchMeta}
      tableProps={{
        ...getTransactionBatchListTableColumns(),
        actions: [
          <NavigateTo type="create" name="Create Settlement Batch" path="/storefront-data/create-settlement-batch" />
        ]
      }}
    />
  )
}

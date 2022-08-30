import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getTransactionBatchDetailsMeta } from "~/TableSearchMeta/TransactionBatch/TransactionBatchDetailsMeta"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"

export function TransactionBatchDetailsPage(props: RouteComponentProps<{ transactionBatchID?: string }>) {
  const TransactionBatchID = props?.match?.params?.transactionBatchID

  return <DetailsPage getMeta={getTransactionBatchDetailsMeta} getDetailsPageContent={TransactionBatchQueries.getSingle} entityType="transactionBatch" entityID={TransactionBatchID} titleKey="transaction_request_id" />
}
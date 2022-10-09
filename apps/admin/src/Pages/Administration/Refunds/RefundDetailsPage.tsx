import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getRefundDetailsMeta } from "~/TableSearchMeta/Refund/RefundDetailsMeta"
import { RefundQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Refunds"

export function RefundDetailsPage(props: RouteComponentProps<{ refundID?: string }>) {
  const RefundID = props?.match?.params?.refundID

  return <DetailsPage getMeta={getRefundDetailsMeta} getDetailsPageContent={RefundQueries.getSingle} entityType="refund" entityID={RefundID} />
}
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getPaymentDetailsMeta } from "~/TableSearchMeta/Payment/PaymentDetailsMeta"
import { PaymentQueries } from "~/packages/services/Api/Queries/AdminQueries/Payments"

export function PaymentDetailsPage(props: RouteComponentProps<{ paymentID?: string }>) {
  const PaymentID = props?.match?.params?.paymentID

  return <DetailsPage getMeta={getPaymentDetailsMeta} getDetailsPageContent={PaymentQueries.getSingle} entityType="payment" entityID={PaymentID} titleKey="transaction_request_id" />
}
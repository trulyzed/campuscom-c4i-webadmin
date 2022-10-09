import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getPaymentGatewayDetailsMeta } from "~/TableSearchMeta/PaymentGateway/PaymentGatewayDetailsMeta"
import { PaymentGatewayQueries } from "@packages/services/lib/Api/Queries/AdminQueries/PaymentGateways"

export function PaymentGatewayDetailsPage(props: RouteComponentProps<{ paymentGatewayID?: string }>) {
  const PaymentGatewayID = props?.match?.params?.paymentGatewayID

  return <DetailsPage getMeta={getPaymentGatewayDetailsMeta} getDetailsPageContent={PaymentGatewayQueries.getSingle} entityType="paymentGateway" entityID={PaymentGatewayID} />
}
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getPaymentGatewayConfigDetailsMeta } from "~/TableSearchMeta/PaymentGatewayConfig/PaymentGatewayConfigDetailsMeta"
import { PaymentGatewayConfigQueries } from "~/packages/services/Api/Queries/AdminQueries/PaymentGatewayConfigs"

export function PaymentGatewayConfigDetailsPage(props: RouteComponentProps<{ paymentGatewayConfigID?: string }>) {
  const PaymentGatewayConfigID = props?.match?.params?.paymentGatewayConfigID

  return <DetailsPage getMeta={getPaymentGatewayConfigDetailsMeta} getDetailsPageContent={PaymentGatewayConfigQueries.getSingle} entityType="paymentGatewayConfig" entityID={PaymentGatewayConfigID} />
}
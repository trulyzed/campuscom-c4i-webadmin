import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getPaymentGatewayConfigDetailsMeta } from "~/TableSearchMeta/PaymentGatewayConfig/PaymentGatewayConfigDetailsMeta"
import { PaymentGatewayConfigQueries } from "@packages/services/lib/Api/Queries/AdminQueries/PaymentGatewayConfigs"

export function PaymentGatewayConfigDetailsPage(props: RouteComponentProps<{ paymentGatewayConfigID?: string }>) {
  const PaymentGatewayConfigID = props?.match?.params?.paymentGatewayConfigID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getPaymentGatewayConfigDetailsMeta} getDetailsPageContent={PaymentGatewayConfigQueries.getSingle} entityType="paymentGatewayConfig" entityID={PaymentGatewayConfigID} titleKey="transaction_request_id" />
}
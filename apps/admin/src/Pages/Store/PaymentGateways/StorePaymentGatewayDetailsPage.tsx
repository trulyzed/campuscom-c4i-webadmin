import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getStorePaymentGatewayDetailsMeta } from "~/TableSearchMeta/PaymentGateway/StorePaymentGatewayDetailsMeta"
import { PaymentGatewayQueries } from "@packages/services/lib/Api/Queries/AdminQueries/PaymentGateways"

export function StorePaymentGatewayDetailsPage(props: RouteComponentProps<{ paymentGatewayID?: string }>) {
  const PaymentGatewayID = props?.match?.params?.paymentGatewayID

  return <DetailsPage getMeta={getStorePaymentGatewayDetailsMeta} getDetailsPageContent={PaymentGatewayQueries.getSingleByStore} entityType="storePaymentGateway" entityID={PaymentGatewayID} />
}
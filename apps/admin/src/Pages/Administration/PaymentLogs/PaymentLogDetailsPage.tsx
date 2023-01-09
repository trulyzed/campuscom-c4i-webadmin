import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getPaymentLogDetailsMeta } from "~/TableSearchMeta/PaymentLog/PaymentLogDetailsMeta"
import { PaymentLogQueries } from "@packages/services/lib/Api/Queries/AdminQueries/PaymentLogs"

export function PaymentLogDetailsPage(props: RouteComponentProps<{ paymentLogID?: string }>) {
  const PaymentLogID = props?.match?.params?.paymentLogID

  return <DetailsPage breadcrumbDataIndex="name" getMeta={getPaymentLogDetailsMeta} getDetailsPageContent={PaymentLogQueries.getSingle} entityType="paymentLog" entityID={PaymentLogID} />
}
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getOrderDetailsMeta } from "~/TableSearchMeta/Order/OrderDetailsMeta"
import { OrderQueries } from "~/packages/services/Api/Queries/AdminQueries/Orders"

export function OrderDetailsPage(props: RouteComponentProps<{ orderID?: string }>) {
  const OrderID = props?.match?.params?.orderID

  return <DetailsPage getMeta={getOrderDetailsMeta} getDetailsPageContent={OrderQueries.getSingle} entityType="order" entityID={OrderID} titleKey="order_ref" />
}
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getOrderDetailsMeta } from "~/TableSearchMeta/Order/OrderDetailsMeta"
import { OrderQueries } from "~/packages/services/Api/Queries/AdminQueries/Orders"

export function OrderDetailsPage(props: RouteComponentProps<{ orderID?: string }>) {
  const OrderID = props?.match?.params?.orderID
  const Param: { [key: string]: any } = { id: OrderID }
  const queryFunc = () => OrderQueries.getSingle!({ params: Param })

  return <DetailsPage getMeta={getOrderDetailsMeta} getDetailsPageContent={queryFunc} entityType="order" entityID={OrderID} titleKey="order_ref" />
}
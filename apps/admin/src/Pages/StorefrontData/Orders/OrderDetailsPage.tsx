import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getOrderDetailsMeta } from "~/TableSearchMeta/Order/OrderDetailsMeta"
import { OrderQueries } from "~/packages/services/Api/Queries/AdminQueries/Orders"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { PaymentQueries } from "~/packages/services/Api/Queries/AdminQueries/Payments"

export function OrderDetailsPage(props: RouteComponentProps<{ orderID?: string }>) {
  const OrderID = props?.match?.params?.orderID

  const orderDetailsQuery = QueryConstructor(() => {
    return Promise.all([OrderQueries.getSingle({ params: { id: OrderID } }), PaymentQueries.getListByOrder({ params: { cart__id: OrderID } })]).then(responses => {
      const [resp1, resp2] = responses
      return {
        ...resp1,
        ...resp2,
        data: {
          ...resp1.data,
          payments: resp2.data
        }
      }
    })
  }, [OrderQueries.getSingle, PaymentQueries.getListByOrder])

  return <DetailsPage getMeta={getOrderDetailsMeta} getDetailsPageContent={orderDetailsQuery} entityType="order" entityID={OrderID} titleKey="order_ref" />
}
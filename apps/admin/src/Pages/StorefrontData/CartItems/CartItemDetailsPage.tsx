import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getCartItemDetailsMeta } from "~/TableSearchMeta/CartItem/CartItemDetailsMeta"
import { CartItemQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CartItems"

export function CartItemDetailsPage(props: RouteComponentProps<{ cartItemID?: string }>) {
  const CartItemID = props?.match?.params?.cartItemID

  return <DetailsPage breadcrumbDataIndex="product.title" getMeta={getCartItemDetailsMeta} getDetailsPageContent={CartItemQueries.getSingle} entityType="cartItem" entityID={CartItemID} titleKey="transaction_request_id" />
}
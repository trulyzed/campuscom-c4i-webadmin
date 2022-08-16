import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getProductDetailsMeta } from "~/TableSearchMeta/Product/ProductDetailsMeta"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"

export function ProductDetailsPage(props: RouteComponentProps<{ productID?: string }>) {
  const ProductID = props?.match?.params?.productID

  return <DetailsPage getMeta={getProductDetailsMeta} getDetailsPageContent={ProductQueries.getSingle} entityType="product" entityID={ProductID} titleKey="transaction_request_id" />
}
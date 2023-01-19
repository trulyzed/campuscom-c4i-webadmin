import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getProductDetailsMeta } from "~/TableSearchMeta/Product/ProductDetailsMeta"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"

export function ProductDetailsPage(props: RouteComponentProps<{ productID?: string }>) {
  const ProductID = props?.match?.params?.productID

  return <DetailsPage breadcrumbDataIndex="title" getMeta={getProductDetailsMeta} getDetailsPageContent={ProductQueries.getSingle} entityType="product" entityID={ProductID} titleKey="transaction_request_id" />
}
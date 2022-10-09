import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getStoreDetailsMeta } from "~/TableSearchMeta/Store/StoreDetailsMeta"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export function StoreDetailsPage(props: RouteComponentProps<{ storeID?: string }>) {
  const StoreID = props?.match?.params?.storeID

  return <DetailsPage getMeta={getStoreDetailsMeta} getDetailsPageContent={StoreQueries.getSingle} entityType="store" entityID={StoreID} titleKey="transaction_request_id" />
}
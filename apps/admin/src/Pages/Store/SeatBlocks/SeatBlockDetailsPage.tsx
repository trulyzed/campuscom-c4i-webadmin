import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getSeatBlockDetailsMeta } from "~/TableSearchMeta/SeatBlock/SeatBlockDetailsMeta"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"

export function SeatBlockDetailsPage(props: RouteComponentProps<{ seatBlockID?: string }>) {
  const SeatBlockID = props?.match?.params?.seatBlockID

  return <DetailsPage breadcrumbDataIndex="reservation_ref" getMeta={getSeatBlockDetailsMeta} getDetailsPageContent={SeatBlockQueries.getSingle} entityType="seatBlock" entityID={SeatBlockID} titleKey="transaction_request_id" />
}
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getSeatDetailsMeta } from "~/TableSearchMeta/Seat/SeatDetailsMeta"
import { SeatQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Seats"

export function SeatDetailsPage(props: RouteComponentProps<{ seatID?: string }>) {
  const SeatID = props?.match?.params?.seatID
  return <DetailsPage breadcrumbDataIndex="token" getMeta={getSeatDetailsMeta} getDetailsPageContent={SeatQueries.getSingle} entityType="seatBlock" entityID={SeatID} titleKey="transaction_request_id" />
}
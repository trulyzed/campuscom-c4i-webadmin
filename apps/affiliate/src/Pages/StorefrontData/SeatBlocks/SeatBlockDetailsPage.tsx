import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getSeatBlockDetailsMeta } from "~/TableSearchMeta/SeatBlock/SeatBlockDetailsMeta"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"

export function SeatBlockDetailsPage(props: RouteComponentProps<{ seatBlockID?: string }>) {
  const SeatBlockID = props?.match?.params?.seatBlockID

  const query = QueryConstructor(((data) => SeatBlockQueries.getSingle({ ...data }).then(resp => {
    if (resp.success) {
      return OrderQueries.getSingle({ params: { id: resp.data?.cart.id } }).then(resp2 => {
        return {
          ...resp,
          data: {
            ...resp.data,
            purchser: {
              ...resp.data.purchaser,
              ...resp2.data.purchaser_info
            }
          }
        }
      })
    }
    return resp
  })), [SeatBlockQueries.getSingle, OrderQueries.getSingle])

  return <DetailsPage breadcrumbDataIndex="reservation_ref" getMeta={getSeatBlockDetailsMeta} getDetailsPageContent={query} entityType="seatBlock" entityID={SeatBlockID} titleKey="transaction_request_id" />
}
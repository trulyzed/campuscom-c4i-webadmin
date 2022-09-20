import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "@packages/components/lib/Page/DetailsPage/DetailsPage"
import { getReservationDetailsMeta } from "~/TableSearchMeta/Reservation/ReservationDetailsMeta"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export function ReservationDetailsPage(props: RouteComponentProps<{ reservationID?: string }>) {
  const CompanyID = props?.match?.params?.reservationID

  return <DetailsPage breadcrumbDataIndex="reservation_name" getMeta={getReservationDetailsMeta} getDetailsPageContent={QueryConstructor((params) => CompanyQueries.getSingle(params).then(resp => resp.success ? ({
    ...resp,
    data,
  }) : resp), [CompanyQueries.getSingle])} entityType="reservation" entityID={CompanyID} titleKey="transaction_request_id" />
}

const data = {
  id: "a108eed8-9447-44a2-8c4a-080162aa81b7",
  ref_id: 1,
  store: {
    name: "BAU",
    id: "034bd604-8d5d-4a56-9302-9b6db3bb2584",
  },
  order_ref: 32,
  purchaser: "SRK Tapu",
  order_date: "2022-09-06T09:56:08.413224Z",
  number_of_seats: "20",
  registered_students: "5",
  available_seats: "15",
  expires_on: "2022-12-14T04:41:01.413224Z",
}
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getReservationListTableColumns } from "~/TableSearchMeta/Reservation/ReservationListTableColumns"
import { ReservationSearchMeta } from "~/TableSearchMeta/Reservation/ReservationSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Seat Reservations"}
      meta={ReservationSearchMeta}
      tableProps={{
        ...getReservationListTableColumns(),
      }}
    />
  )
}

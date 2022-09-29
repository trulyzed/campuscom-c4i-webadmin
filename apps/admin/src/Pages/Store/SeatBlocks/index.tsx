import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getSeatBlockListTableColumns } from "~/TableSearchMeta/SeatBlock/SeatBlockListTableColumns"
import { SeatBlockSearchMeta } from "~/TableSearchMeta/SeatBlock/SeatBlockSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Seat Blocks"}
      meta={SeatBlockSearchMeta}
      tableProps={{
        ...getSeatBlockListTableColumns(),
      }}
    />
  )
}

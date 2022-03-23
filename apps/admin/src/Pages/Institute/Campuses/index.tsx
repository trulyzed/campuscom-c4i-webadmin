import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getCampusListTableColumns } from "~/TableSearchMeta/Campus/CampusListTableColumns"
import { CampusSearchMeta } from "~/TableSearchMeta/Campus/CampusSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Campuses"}
      meta={CampusSearchMeta}
      tableProps={getCampusListTableColumns()}
    />
  )
}

import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getCareerListTableColumns } from "~/TableSearchMeta/Career/CareerListTableColumns"
import { CareerSearchMeta } from "~/TableSearchMeta/Career/CareerSearchMeta"

export const List = () => {

  return (
    <SearchPage
      title={"Careers"}
      meta={CareerSearchMeta}
      tableProps={{
        ...getCareerListTableColumns(),
      }}
    />
  )
}

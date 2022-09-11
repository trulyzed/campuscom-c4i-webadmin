import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getPublishingListTableColumns } from "~/TableSearchMeta/Publishing/PublishingListTableColumns"
import { getPublishingSearchMeta } from "~/TableSearchMeta/Publishing/PublishingSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Store Items"}
      meta={getPublishingSearchMeta()}
      tableProps={getPublishingListTableColumns()}
    />
  )
}

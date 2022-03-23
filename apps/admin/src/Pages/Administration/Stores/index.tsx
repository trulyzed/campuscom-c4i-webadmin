import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getStoreListTableColumns } from "~/TableSearchMeta/Store/StoreListTableColumns"
import { StoreSearchMeta } from "~/TableSearchMeta/Store/StoreSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Stores"}
      meta={StoreSearchMeta}
      tableProps={getStoreListTableColumns()}
    />
  )
}

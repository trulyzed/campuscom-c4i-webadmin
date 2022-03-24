import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns"
import { UserSearchMeta } from "~/TableSearchMeta/User/UserSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Users"}
      meta={UserSearchMeta}
      tableProps={getUserListTableColumns()}
    />
  )
}

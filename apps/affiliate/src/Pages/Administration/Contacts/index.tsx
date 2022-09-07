import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getContactListTableColumns } from "~/TableSearchMeta/Contact/ContactListTableColumns"
import { ContactSearchMeta } from "~/TableSearchMeta/Contact/ContactSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Contacts"}
      meta={ContactSearchMeta}
      tableProps={{
        ...getContactListTableColumns(),
      }}
    />
  )
}

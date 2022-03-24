import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getIdentityProviderListTableColumns } from "~/TableSearchMeta/IdentityProvider/IdentityProviderListTableColumns"
import { IdentityProviderSearchMeta } from "~/TableSearchMeta/IdentityProvider/IdentityProviderSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Identity Providers"}
      meta={IdentityProviderSearchMeta}
      tableProps={getIdentityProviderListTableColumns()}
    />
  )
}

import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Products"}
      meta={ProductSearchMeta}
      tableProps={{
        ...getProductListTableColumns(),
      }}
    />
  )
}

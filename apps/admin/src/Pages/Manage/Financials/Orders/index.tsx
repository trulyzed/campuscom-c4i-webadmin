import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { Button } from "antd"
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns"
import { OrderSearchMeta } from "~/TableSearchMeta/Order/OrderSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Orders"}
      meta={OrderSearchMeta}
      blocks={[<Button>Add New</Button>]}
      tableProps={getOrderListTableColumns()}
    />
  )
}

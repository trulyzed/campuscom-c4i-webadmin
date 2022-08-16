import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getRefundListTableColumns } from "~/TableSearchMeta/Refund/RefundListTableColumns"
import { RefundSearchMeta } from "~/TableSearchMeta/Refund/RefundSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Refunds"}
      meta={RefundSearchMeta}
      tableProps={getRefundListTableColumns()}
    />
  )
}

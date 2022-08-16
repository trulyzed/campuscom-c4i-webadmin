import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { getPaymentListTableColumns } from "~/TableSearchMeta/Payment/PaymentListTableColumns"
import { PaymentSearchMeta } from "~/TableSearchMeta/Payment/PaymentSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Payments"}
      meta={PaymentSearchMeta}
      tableProps={getPaymentListTableColumns()}
    />
  )
}

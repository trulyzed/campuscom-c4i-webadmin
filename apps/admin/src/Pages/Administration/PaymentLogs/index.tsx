import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getPaymentLogListTableColumns } from "~/TableSearchMeta/PaymentLog/PaymentLogListTableColumns"
import { PaymentLogSearchMeta } from "~/TableSearchMeta/PaymentLog/PaymentLogSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Payment Logs"}
      meta={PaymentLogSearchMeta}
      tableProps={{
        ...getPaymentLogListTableColumns(),
      }}
    />
  )
}

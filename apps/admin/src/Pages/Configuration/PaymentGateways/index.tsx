import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getPaymentGatewayListTableColumns } from "~/TableSearchMeta/PaymentGateway/PaymentGatewayListTableColumns"
import { PaymentGatewaySearchMeta } from "~/TableSearchMeta/PaymentGateway/PaymentGatewaySearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Payment Gateways"}
      meta={PaymentGatewaySearchMeta}
      tableProps={getPaymentGatewayListTableColumns()}
    />
  )
}

import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getPaymentGatewayConfigListTableColumns } from "~/TableSearchMeta/PaymentGatewayConfig/PaymentGatewayConfigListTableColumns"
import { PaymentGatewayConfigSearchMeta } from "~/TableSearchMeta/PaymentGatewayConfig/PaymentGatewayConfigSearchMeta"

export const List = () => {
  return (
    <SearchPage
      title={"Payment Gateway Configs"}
      meta={PaymentGatewayConfigSearchMeta}
      tableProps={getPaymentGatewayConfigListTableColumns()}
    />
  )
}

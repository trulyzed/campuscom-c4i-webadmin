import { Spin, Typography } from "antd"
import { CardContainer } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"
import { useBalanceInfo } from "./useBalanceInfo"

export const BalanceInfo: CardContainer['Component'] = () => {
  const { balance, isProcessing } = useBalanceInfo()

  return (
    <>
      {isProcessing ? <Spin />
        : <Typography.Title level={2}>{renderAmount(balance)}</Typography.Title>}
    </>
  )
}
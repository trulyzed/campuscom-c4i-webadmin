import { CardContainer } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"
import { ProfileDetailsQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/ProfileDetails"
import { Spin, Typography } from "antd"
import { useEffect, useState } from "react"

export const BalanceInfo: CardContainer['Component'] = ({ inheritedProps }) => {
  const [balance, setBalance] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchBalance = async () => {
      setIsProcessing(true)
      const resp = await ProfileDetailsQueries.getData()
      if (resp.success) setBalance(resp.data.balance)
      setIsProcessing(false)
    }
    fetchBalance()
  }, [])

  return (
    <>
      {isProcessing ? <Spin />
        : <Typography.Title level={2}>{renderAmount(balance)}</Typography.Title>}
    </>
  )
}
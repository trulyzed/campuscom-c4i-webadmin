import { useEffect, useState } from "react"
import { ProfileDetailsQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/ProfileDetails"

export const useBalanceInfo = () => {
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

  return {
    balance,
    isProcessing
  }
}
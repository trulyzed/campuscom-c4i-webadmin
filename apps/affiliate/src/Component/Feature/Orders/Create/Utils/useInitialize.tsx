import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"
import { useCallback, useContext, useEffect, useState } from "react"
import { IOrderType } from "./types"

interface IUseInitialize {
  storeData?: Record<string, any>
  productData: Record<string, any>[]
  setOrderDetails: (...args: any[]) => void
  setStoreData: (...args: any[]) => void
  setPurchaserData: (...args: any[]) => void
  setProductData: (...args: any[]) => void
  reservationDetails?: Record<string, any>
  orderType?: IOrderType
}

export const useInitialize = ({
  storeData,
  productData,
  setOrderDetails,
  setStoreData,
  setPurchaserData,
  setProductData,
  reservationDetails,
  orderType,
}: IUseInitialize) => {
  const { userData } = useContext(UserDataContext)
  const [isFetchingOrderDetails, setIsFetchingOrderDetails] = useState(false)

  const getOrderDetails = useCallback(async () => {
    if (!storeData?.store) {
      setOrderDetails(undefined)
      return
    }
    const productIds = productData.map(i => i.id)
    setIsFetchingOrderDetails(true)
    const resp = await OrderQueries.getCreatableOrderDetails({ data: { product_ids: productIds, store: storeData.store } })
    setIsFetchingOrderDetails(false)
    if (resp.success) setOrderDetails(resp.data)
    else setOrderDetails(undefined)
  }, [storeData, productData, setOrderDetails])

  // Fetch order details
  useEffect(() => {
    getOrderDetails()
  }, [getOrderDetails])

  // Initialize data for seat registration
  useEffect(() => {
    if (reservationDetails) {
      setStoreData({ store: reservationDetails.store.id })
      setPurchaserData({
        first_name: reservationDetails.purchaser.first_name,
        last_name: reservationDetails.purchaser.last_name,
        email: reservationDetails.purchaser.primary_email,
        purchaser: reservationDetails.purchaser.id,
        purchasing_for: reservationDetails.purchaser.purchasing_for?.type,
        company: reservationDetails.purchaser.purchasing_for?.ref,
        ...Object.keys(reservationDetails.purchaser.extra_info || {}).reduce((a, c) => {
          a[`profile_question__${c}`] = (reservationDetails.purchaser.extra_info as Record<string, any>)[c]
          return a
        }, {} as Record<string, any>)
      })
      setProductData([
        {
          id: reservationDetails.product.id,
          title: reservationDetails.product.name,
          quantity: 1,
          order_type: "registration",
          product_type: "section",
          unit: "registration",
          related_products: []
        }
      ])
    }
  }, [reservationDetails, setStoreData, setPurchaserData, setProductData])

  // Initialize data for bulk enrollment
  useEffect(() => {
    if (orderType !== 'CREATE_BULK_ENROLLMENT' || !userData) return
    const companyStore = userData.context.find(i => i.type === 'Company')?.values[0]?.store
    if (companyStore) setStoreData({ store: companyStore })
  }, [setStoreData, userData, orderType])

  return {
    getOrderDetails,
    isFetchingOrderDetails,
  }
}
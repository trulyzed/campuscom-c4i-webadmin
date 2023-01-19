import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"
import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"
import { ICreateOrderInitialValue } from "~/Component/Feature/Orders/Create/CreateOrder"

interface IUseInitialize {
  storeData?: Record<string, any>
  productData: Record<string, any>[]
  setOrderDetails: (...args: any[]) => void
  setStoreData: (...args: any[]) => void
  setPurchaserData: (...args: any[]) => void
  setProductData: (...args: any[]) => void
  initialValue?: ICreateOrderInitialValue
}

export const useInitialize = ({
  storeData,
  productData,
  setOrderDetails,
  setStoreData,
  setPurchaserData,
  setProductData,
  initialValue,
}: IUseInitialize) => {
  const { userData } = useContext(UserDataContext)
  const contextStores = useMemo(() => userData?.context.find(i => i.type === 'Store')?.values || [], [userData])
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

  // Initialize data
  useEffect(() => {
    if (initialValue) {
      setStoreData({ store: initialValue.store.id })
      setPurchaserData({
        first_name: initialValue.purchaser.first_name,
        last_name: initialValue.purchaser.last_name,
        email: initialValue.purchaser.primary_email,
        purchaser: initialValue.purchaser.id,
        purchasing_for: initialValue.purchaser.purchasing_for?.type,
        company: initialValue.purchaser.purchasing_for?.ref,
        ...Object.keys(initialValue.purchaser.extra_info || {}).reduce((a, c) => {
          a[`profile_question__${c}`] = (initialValue.purchaser.extra_info as Record<string, any>)[c]
          return a
        }, {} as Record<string, any>)
      })
      setProductData([
        {
          id: initialValue.product.id,
          title: initialValue.product.title,
          quantity: 1,
          order_type: "registration",
          product_type: "section",
          unit: "registration",
          related_products: []
        }
      ])
    } else if (contextStores.length === 1) {
      setStoreData({ store: contextStores[0].id })
    }
  }, [contextStores, initialValue, setStoreData, setPurchaserData, setProductData])

  return {
    getOrderDetails,
    isFetchingOrderDetails,
  }
}
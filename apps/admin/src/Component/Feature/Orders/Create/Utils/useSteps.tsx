import { useContext, useMemo } from "react"
import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"
import { IOrderType, Steps } from "./types"

const stepReducer = <T extends Record<keyof typeof Steps, number>,>(steps: T, reduceAmount: number): T => {
  return Object.keys(steps).reduce((a, c) => {
    const newVal = a[c as keyof typeof Steps] - reduceAmount
    a = {
      ...a,
      [c]: newVal < 0 ? NaN : newVal
    }
    return a
  }, { ...steps })
}

export const useSteps = (type: IOrderType) => {
  const { userData } = useContext(UserDataContext)
  const contextStores = useMemo(() => userData?.context.find(i => i.type === 'Store')?.values || [], [userData])
  const noStoreStep = contextStores.length === 1

  let steps: Record<keyof typeof Steps, number> = {
    StoreInformation: Steps.StoreInformation,
    PurchaserInformation: Steps.PurchaserInformation,
    ProductInformation: Steps.ProductInformation,
    StudentInformation: Steps.StudentInformation,
    RegistrationInformation: Steps.RegistrationInformation,
    AdditionalRegistrationInformation: Steps.AdditionalRegistrationInformation,
    Invoice: Steps.Invoice,
    PaymentInformation: Steps.PaymentInformation,
    Summary: NaN
  }

  if (type === 'REGISTRATION') {
    steps = {
      StoreInformation: NaN,
      PurchaserInformation: NaN,
      ProductInformation: NaN,
      StudentInformation: 0,
      RegistrationInformation: NaN,
      AdditionalRegistrationInformation: 1,
      Invoice: 2,
      PaymentInformation: 3,
      Summary: NaN
    }
  } else if (type === 'CREATE_BULK_ENROLLMENT') {
    steps = {
      StoreInformation: 0,
      PurchaserInformation: 1,
      ProductInformation: 2,
      StudentInformation: 3,
      RegistrationInformation: NaN,
      AdditionalRegistrationInformation: NaN,
      Summary: 4,
      Invoice: NaN,
      PaymentInformation: NaN,
    }
  }

  return {
    steps: (noStoreStep && !isNaN(steps.StoreInformation)) ? stepReducer(steps, 1) : steps
  }
}

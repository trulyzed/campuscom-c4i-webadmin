import { IOrderType, Steps } from "./types"

export const useSteps = (type: IOrderType) => {
  let steps: Record<keyof typeof Steps, number> = {
    StoreInformation: Steps.StoreInformation,
    PurchaserInformation: Steps.PurchaserInformation,
    ProductInformation: Steps.ProductInformation,
    StudentInformation: Steps.StudentInformation,
    RegistrationInformation: Steps.RegistrationInformation,
    AdditionalRegistrationInformation: Steps.AdditionalRegistrationInformation,
    Invoice: Steps.Invoice,
    PaymentInformation: Steps.PaymentInformation,
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
    }
  } else if (type === 'CREATE_BULK_ENROLLMENT') {
    steps = {
      StoreInformation: NaN,
      PurchaserInformation: 0,
      ProductInformation: 1,
      StudentInformation: 2,
      RegistrationInformation: NaN,
      AdditionalRegistrationInformation: 3,
      Invoice: 4,
      PaymentInformation: 5,
    }
  }

  return {
    steps
  }
}
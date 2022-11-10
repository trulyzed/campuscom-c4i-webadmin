import { IOrderType, Steps } from "./types"

interface IUseStepsOptions {
  noStoreStep?: boolean
}

export const useSteps = (type: IOrderType, options?: IUseStepsOptions) => {
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
    if (options?.noStoreStep) {
      steps = {
        StoreInformation: NaN,
        PurchaserInformation: 0,
        ProductInformation: 1,
        StudentInformation: 2,
        RegistrationInformation: NaN,
        AdditionalRegistrationInformation: 3,
        Summary: 4,
        Invoice: NaN,
        PaymentInformation: NaN,
      }
    } else {
      steps = {
        StoreInformation: 0,
        PurchaserInformation: 1,
        ProductInformation: 2,
        StudentInformation: 3,
        RegistrationInformation: NaN,
        AdditionalRegistrationInformation: 4,
        Summary: 5,
        Invoice: NaN,
        PaymentInformation: NaN,
      }
    }
  }

  return {
    steps
  }
}

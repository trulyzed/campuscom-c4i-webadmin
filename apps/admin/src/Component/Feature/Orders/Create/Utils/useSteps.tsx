import { Steps } from "./types"

export const useSteps = (registerSingleStudent?: boolean) => {
  const steps: Record<keyof typeof Steps, number> = {
    StoreInformation: registerSingleStudent ? NaN : Steps.StoreInformation,
    PurchaserInformation: registerSingleStudent ? NaN : Steps.PurchaserInformation,
    ProductInformation: registerSingleStudent ? NaN : Steps.ProductInformation,
    StudentInformation: registerSingleStudent ? 0 : Steps.StudentInformation,
    RegistrationInformation: registerSingleStudent ? NaN : Steps.RegistrationInformation,
    AdditionalRegistrationInformation: registerSingleStudent ? 1 : Steps.AdditionalRegistrationInformation,
    Invoice: registerSingleStudent ? 2 : Steps.Invoice,
    PaymentInformation: registerSingleStudent ? 3 : Steps.PaymentInformation,
  }

  return {
    steps
  }
}
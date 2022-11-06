import { Steps } from "./types"

export const useSteps = (isTokenRegistration?: boolean) => {
  const steps: Record<keyof typeof Steps, number> = {
    StoreInformation: isTokenRegistration ? NaN : Steps.StoreInformation,
    PurchaserInformation: isTokenRegistration ? NaN : Steps.PurchaserInformation,
    ProductInformation: isTokenRegistration ? NaN : Steps.ProductInformation,
    StudentInformation: isTokenRegistration ? 0 : Steps.StudentInformation,
    RegistrationInformation: isTokenRegistration ? NaN : Steps.RegistrationInformation,
    AdditionalRegistrationInformation: isTokenRegistration ? 1 : Steps.AdditionalRegistrationInformation,
    Invoice: isTokenRegistration ? 2 : Steps.Invoice,
    PaymentInformation: isTokenRegistration ? 3 : Steps.PaymentInformation,
  }

  return {
    steps
  }
}
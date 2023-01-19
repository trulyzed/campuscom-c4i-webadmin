export enum Steps {
  StoreInformation,
  PurchaserInformation,
  ProductInformation,
  StudentInformation,
  RegistrationInformation,
  AdditionalRegistrationInformation,
  Invoice,
  PaymentInformation,
  Summary
}

export type IActionType = 'CREATE_ORDER' | 'CREATE_BULK_ENROLLMENT' | 'UPDATE_ORDER'
export enum Steps {
  StoreInformation,
  PurchaserInformation,
  ProductInformation,
  StudentInformation,
  RegistrationInformation,
  AdditionalRegistrationInformation,
  Invoice,
  PaymentInformation
}

export type IOrderType = 'REGISTRATION' | 'CREATE_BULK_ENROLLMENT' | 'CREATE_ORDER'
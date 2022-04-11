import { IField, DROPDOWN, TEXT, TEXTAREA } from "~/packages/components/Form/common"
import { PaymentGatewayConfigQueries } from "~/packages/services/Api/Queries/AdminQueries/PaymentGatewayConfigs"
import { PaymentGatewayQueries } from "~/packages/services/Api/Queries/AdminQueries/PaymentGateways"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const PaymentGatewayTaggingFormMeta: IField[] = [
  {
    label: 'Name',
    fieldName: 'name',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Payment Gateway',
    fieldName: 'payment_gateway',
    inputType: DROPDOWN,
    refLookupService: PaymentGatewayQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Payment Gateway Config',
    fieldName: 'payment_gateway_config',
    inputType: DROPDOWN,
    refLookupService: PaymentGatewayConfigQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Branding',
    fieldName: 'branding',
    inputType: TEXTAREA,
  },
]

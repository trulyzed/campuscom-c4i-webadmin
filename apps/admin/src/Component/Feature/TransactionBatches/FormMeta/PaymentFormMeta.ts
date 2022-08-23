import { DATE_PICKER, IField, TEXTAREA } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const PaymentFormMeta: IField[] = [
  {
    label: "Payment Ref",
    inputType: TEXTAREA,
    fieldName: "payment_ref",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Payment Note",
    inputType: TEXTAREA,
    fieldName: "payment_note",
  },
  {
    label: "Payment Date",
    inputType: DATE_PICKER,
    fieldName: "payment_date",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

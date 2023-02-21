import { IField, NUMBER, TEXTAREA } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getEmployeeTransactionFormMeta = ():IField[] => [
  {
    label: "Amount",
    inputType: NUMBER,
    fieldName: "amount",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Note",
    inputType: TEXTAREA,
    fieldName: "credit_note"
  },
]

import { IField, NUMBER, TEXT } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getTransactionBatchRevenueCalculateFormMeta = (hideFields: boolean): IField[] => [
  {
    label: "Total Transaction Amount",
    inputType: TEXT,
    fieldName: "total_transaction_amount",
    disabled: true,
  },
  {
    label: "Revenue Amount (Calculated)",
    inputType: TEXT,
    fieldName: "revenue_amount",
    disabled: true,
    //hidden: hideFields
  },
  {
    label: "Total Cheque Amount",
    inputType: TEXT,
    fieldName: "total_cheque_amount",
    disabled: true,
    //hidden: hideFields
  },
  {
    label: "Revenue Percentage",
    inputType: NUMBER,
    fieldName: "revenue_percentage",
    rules: [{ required: true, message: "This field is required!"}, {type: "number", max: 100, min: 0, message: "Value should be between 0-100"}]
  },
]

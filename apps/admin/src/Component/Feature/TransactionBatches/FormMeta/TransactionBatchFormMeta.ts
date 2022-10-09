import { DATE_PICKER, IField, TEXT } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const TransactionBatchFormMeta: IField[] = [
  {
    label: "Batch Name",
    inputType: TEXT,
    fieldName: "name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "start_date",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "end_date",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

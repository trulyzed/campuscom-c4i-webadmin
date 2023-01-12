import { IField, TEXT, DATE_PICKER } from "@packages/components/lib/Form/common"

export const PaymentLogSearchMeta: IField[] = [
  {
    label: "Order ID",
    inputType: TEXT,
    fieldName: "order",
  },
  {
    label: "From Date",
    inputType: DATE_PICKER,
    fieldName: "from_date",
  },
  {
    label: "To Date",
    inputType: DATE_PICKER,
    fieldName: "to_date",
  },
  {
    label: "Summary",
    inputType: TEXT,
    fieldName: "summary",
  },
]

import { DROPDOWN, DATE_PICKER, IField, TEXT } from "@packages/components/lib/Form/common"

export const TransactionBatchSearchMeta: IField[] = [
  {
    label: "Batch Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "start_date__gte",
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "start_date__lt",
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "status",
    options: [
      { label: "Paid", value: "paid" },
      { label: "Unpaid", value: "unpaid" }
    ]
  },
]

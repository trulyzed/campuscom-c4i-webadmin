import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"

export const TransactionBatchSearchMeta: IField[] = [
  {
    label: "Batch ID",
    fieldName: "batch_ref",
    inputType: TEXT,
  },
  {
    label: "Status",
    fieldName: "status",
    inputType: DROPDOWN,
    options: [
      { label: "Paid", value: "paid" },
      { label: "Unpaid", value: "unpaid" },
    ],
  },
]

import { IField, DROPDOWN } from "@packages/components/lib/Form/common"

export const ERPLogSearchMeta: IField[] = [
  {
    label: "Type",
    inputType: DROPDOWN,
    fieldName: "type",
    options: [
      { label: "Request", value: "request" },
      { label: "Response", value: "response" }
    ]
  },
]

import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"

export const PaymentGatewayConfigSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Sandbox Status",
    inputType: DROPDOWN,
    fieldName: "is_sandbox",
    options:[
      { value: 'True', label: 'Yes',},
      { value: 'False', label: 'No',},
    ]
  }
]

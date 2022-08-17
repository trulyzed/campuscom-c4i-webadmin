import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"

export const PaymentGatewaySearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Active Status",
    inputType: DROPDOWN,
    fieldName: "is_active",
    options:[
      { value: 'True', label: 'Yes',},
      { value: 'False', label: 'No',},
    ]
  }
]

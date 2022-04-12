import { IField, TEXT } from "~/packages/components/Form/common"

export const PaymentGatewaySearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Slug",
    inputType: TEXT,
    fieldName: "slug",
  }
]

import { IField, TEXT } from "@packages/components/lib/Form/common"

export const CompanyUserSearchMeta: IField[] = [
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "first_name__icontains",
  },
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "last_name__icontains",
  },
]

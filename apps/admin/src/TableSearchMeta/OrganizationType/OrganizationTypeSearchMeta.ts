import { IField, TEXT } from "@packages/components/lib/Form/common"

export const OrganizationTypeSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
]

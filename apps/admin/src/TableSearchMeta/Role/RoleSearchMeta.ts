import { IField, TEXT } from "@packages/components/lib/Form/common"

export const RoleSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
]

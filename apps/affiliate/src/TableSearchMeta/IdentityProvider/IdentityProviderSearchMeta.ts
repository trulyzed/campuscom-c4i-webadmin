import { IField, TEXT } from "@packages/components/lib/Form/common"

export const IdentityProviderSearchMeta: IField[] = [
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

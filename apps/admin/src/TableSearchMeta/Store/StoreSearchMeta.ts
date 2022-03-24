import { IField, TEXT } from "~/packages/components/Form/common"

export const StoreSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Slug",
    inputType: TEXT,
    fieldName: "url_slug__icontains",
  }
]

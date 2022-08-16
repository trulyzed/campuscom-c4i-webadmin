import { IField, TEXT } from "~/packages/components/Form/common"

export const UserSearchMeta: IField[] = [
  {
    label: "Username",
    inputType: TEXT,
    fieldName: "username__icontains",
  },
  {
    label: "Email",
    inputType: TEXT,
    fieldName: "email",
  },
]

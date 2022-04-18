import { IField, TEXT } from "~/packages/components/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const RoleFormMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

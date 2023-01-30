import { EDITOR, IField, TEXT } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getOrganizationTypeFormMeta = ():IField[] => [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Description",
    inputType: EDITOR,
    fieldName: "description",
  },
]

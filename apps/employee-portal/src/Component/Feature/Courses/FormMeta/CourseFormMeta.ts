import { IField, TEXT } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getCourseFormMeta = ():IField[] => [
  {
    label: "Note",
    inputType: TEXT,
    fieldName: "note",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

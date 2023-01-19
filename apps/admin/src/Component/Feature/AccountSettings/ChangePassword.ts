import { IField, PASSWORD } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getChangePasswordFormMeta =(): IField[] => [
  {
    label: "Current Password",
    inputType: PASSWORD,
    fieldName: "old_password",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "New Password",
    inputType: PASSWORD,
    fieldName: "new_password1",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

import { IField, PASSWORD } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getResetPasswordFormMeta = (): IField[] => [
  {
    label: "New Password",
    inputType: PASSWORD,
    fieldName: "new_password",
    rules: [{ required: true, message: "This field is required!" }]
  }
]

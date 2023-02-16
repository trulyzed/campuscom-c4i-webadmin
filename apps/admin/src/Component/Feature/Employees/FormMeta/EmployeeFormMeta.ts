import { IField, TEXT, DROPDOWN } from "@packages/components/lib/Form/common"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getEmployeeFormMeta = ():IField[] => [
  {
    label: "First name",
    inputType: TEXT,
    fieldName: "first_name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Last name",
    inputType: TEXT,
    fieldName: "last_name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Username",
    inputType: TEXT,
    fieldName: "username",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Password",
    inputType: TEXT,
    fieldName: "password",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Email",
    inputType: TEXT,
    fieldName: "email",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Primary contact number",
    inputType: TEXT,
    fieldName: "primary_contact_number",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Organizations",
    inputType: DROPDOWN,
    fieldName: "companies",
    refLookupService: CompanyQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

import { BOOLEAN, IField, TEXT, MULTI_SELECT_DROPDOWN } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
import { RoleQueries } from "~/packages/services/Api/Queries/AdminQueries/Roles"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const UserFormMeta: IField[] = [
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
    label: "Roles",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "custom_roles",
    refLookupService: RoleQueries.getLookupData,
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: "Is Scope Disabled",
    inputType: BOOLEAN,
    fieldName: "is_scope_disabled"
  },
  {
    label: "Two-factor authentication enabled",
    inputType: BOOLEAN,
    fieldName: "mfa_enabled"
  },
  {
    label: "Is active",
    inputType: BOOLEAN,
    fieldName: "is_active"
  },
  {
    label: "Course Providers",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "course_providers",
    refLookupService: CourseProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: "Stores",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "stores",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id"
  }
]

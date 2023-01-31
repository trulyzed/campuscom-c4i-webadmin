import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { DepartmentQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Departments"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getEmployeeFormMeta = ():IField[] => [
  {
    label: "Organization",
    inputType: DROPDOWN,
    fieldName: "organization",
    refLookupService: OrganizationQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "department",
    refLookupService: DepartmentQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "first_name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "last_name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Gender",
    inputType: DROPDOWN,
    fieldName: "gender",
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'others', label: 'Others' },
    ],
    rules: [{ required: true, message: "This field is required!" }]
  },
]

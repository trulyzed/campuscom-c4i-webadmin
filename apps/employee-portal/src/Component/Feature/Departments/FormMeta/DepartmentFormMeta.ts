import { DROPDOWN, EDITOR, IField, TEXT } from "@packages/components/lib/Form/common"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getDepartmentFormMeta = ():IField[] => [
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
    label: "Name",
    inputType: TEXT,
    fieldName: "name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Short Name",
    inputType: TEXT,
    fieldName: "short_name",
  },
  {
    label: "Description",
    inputType: EDITOR,
    fieldName: "description",
  },
]

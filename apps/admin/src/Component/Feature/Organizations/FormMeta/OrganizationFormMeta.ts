import { DROPDOWN, EDITOR, IField, TEXT, TEXTAREA } from "@packages/components/lib/Form/common"
import { OrganizationTypeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/OrganizationTypes"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getOrganizationFormMeta = ():IField[] => [
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
    label: "Organization Type",
    inputType: DROPDOWN,
    fieldName: "organization_type",
    refLookupService: OrganizationTypeQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: "Parent Organization",
    inputType: DROPDOWN,
    fieldName: "parent_organization",
    refLookupService: OrganizationQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
  },
  {
    label: "Description",
    inputType: EDITOR,
    fieldName: "description",
  },
  {
    label: "Address",
    inputType: TEXTAREA,
    fieldName: "address",
  },
  {
    label: "Email",
    inputType: TEXT,
    fieldName: "email",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Contact",
    inputType: TEXT,
    fieldName: "contact_no",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

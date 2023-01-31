import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { OrganizationTypeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/OrganizationTypes"

export const OrganizationSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Short Name",
    inputType: TEXT,
    fieldName: "short_name__icontains",
  },
  {
    label: "Organization Type",
    inputType: DROPDOWN,
    refLookupService: OrganizationTypeQueries.getLookupData,
    fieldName: "organization_type",
    displayKey: "name",
    valueKey: "id",
  },
  {
    label: "Email",
    inputType: TEXT,
    fieldName: "email__icontains",
  },
  {
    label: "Contact",
    inputType: TEXT,
    fieldName: "contact_no__icontains",
  },
]

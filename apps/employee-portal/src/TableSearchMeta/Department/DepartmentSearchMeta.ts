import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { OrganizationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Organizations"

export const DepartmentSearchMeta: IField[] = [
  {
    label: "Organization",
    inputType: DROPDOWN,
    refLookupService: OrganizationQueries.getLookupData,
    fieldName: "organization",
    displayKey: "name",
    valueKey: "id",
  },
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
]

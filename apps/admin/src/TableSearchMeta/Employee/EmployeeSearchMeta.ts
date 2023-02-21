import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"

export const EmployeeSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id",
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: "Organization",
    inputType: DROPDOWN,
    fieldName: "company",
    refLookupService: CompanyQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
  },
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "profile_store__profile__first_name__icontains",
  },
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "profile_store__profile__last_name__icontains",
  },
  {
    label: "Email",
    inputType: TEXT,
    fieldName: "profile_store__profile__primary_email__icontains",
  },
]

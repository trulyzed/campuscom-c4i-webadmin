import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const ContactSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "profile_stores__store",
    displayKey: "name",
    valueKey: "id",
    autoSelectSingle: true
  },
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "first_name__icontains",
  },
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "last_name__icontains",
  },
]

import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getCompanyFormMeta = ():IField[] => [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: "Organization Name",
    inputType: TEXT,
    fieldName: "company_name",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

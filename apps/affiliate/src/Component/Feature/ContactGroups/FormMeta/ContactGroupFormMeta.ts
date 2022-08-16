import { BOOLEAN, DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const ContactGroupFormMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Is Active",
    inputType: BOOLEAN,
    fieldName: "is_active",
    initialValue: true,
  },
]

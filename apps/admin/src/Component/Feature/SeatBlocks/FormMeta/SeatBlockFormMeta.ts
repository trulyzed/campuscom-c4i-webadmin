import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getSeatBlockFormMeta = (reservation?: Record<string, any>):IField[] => [
  {
    label: "Student",
    inputType: DROPDOWN,
    fieldName: "student",
    refLookupService: QueryConstructor(() => ContactQueries.getLookupData({ params: { profile_stores__store: reservation?.store?.id } }), [ContactQueries.getLookupData]),
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
]

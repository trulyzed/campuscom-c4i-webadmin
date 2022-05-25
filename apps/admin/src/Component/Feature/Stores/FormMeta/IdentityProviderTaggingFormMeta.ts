import { IField, DROPDOWN } from "~/packages/components/Form/common"
import { IdentityProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/IdentityProviders"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const IdentityProviderTaggingFormMeta: IField[] = [
  {
    label: 'Identity Provider',
    fieldName: 'identity_provider',
    inputType: DROPDOWN,
    refLookupService: IdentityProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

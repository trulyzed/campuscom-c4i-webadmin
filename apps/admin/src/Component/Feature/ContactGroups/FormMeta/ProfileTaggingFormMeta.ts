import { IField, MULTI_SELECT_GROUP_CHECKBOX, TEXT, } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"

export const getProfileTaggingFormMeta = (contactGroupID: string): IField[] => {
  return [
    {
      label: "Search",
      inputType: TEXT,
      fieldName: "search",
      excludeFromSubmission: true,
    },
    {
      label: "Profiles",
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "profiles",
      rules: [{ required: true, message: "This field is required!" }],
      refLookupService: QueryConstructor(args => ContactQueries.getListByContactGroup({...args, params: {...args?.params, contact_group: contactGroupID}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: resp.data}]}) : resp), [ContactQueries.getListByContactGroup]),
      displayKey2: "primary_email",
      valueKey2: "id",
      dependencies: ['search'],
      performInitialLookup: true,
      onDependencyChange: (value, {loadOptions}) => {loadOptions?.({params: {primary_email__icontains: value?.search}})},
    },
  ]
}

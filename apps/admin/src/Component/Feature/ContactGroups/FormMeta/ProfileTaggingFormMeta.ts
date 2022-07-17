import { IField, MULTI_SELECT_GROUP_CHECKBOX, TEXT, } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { StudentQueries } from "~/packages/services/Api/Queries/AdminQueries/Students"

export const getProfileTaggingFormMeta = (storeID: string): IField[] => {
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
      refLookupService: QueryConstructor(args => StudentQueries.getList({...args, params: {...args?.params, store: storeID}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: resp.data}]}) : resp), [StudentQueries.getList]),
      displayKey2: "primary_email",
      valueKey2: "id",
      refLookupDependencies: ['search'],
      performInitialLookup: true,
      onDependencyChange: (value, {loadOptions}) => {loadOptions?.({params: {primary_email__icontains: value?.search}})},
    },
  ]
}

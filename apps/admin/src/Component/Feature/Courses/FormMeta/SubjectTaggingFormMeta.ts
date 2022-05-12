import { IField, MULTI_SELECT_GROUP_CHECKBOX, } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { SubjectQueries } from "~/packages/services/Api/Queries/AdminQueries/Subjects"

export const getSubjectTaggingFormMeta = (storeId: string): IField[] => {
  return [
    {
      label: "Subjects",
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "subjects",
      refLookupService: QueryConstructor(() => SubjectQueries.getPaginatedList({params: {store: storeId}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: resp.data}]}) : resp), [SubjectQueries.getPaginatedList]),
      displayKey2: "title",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}

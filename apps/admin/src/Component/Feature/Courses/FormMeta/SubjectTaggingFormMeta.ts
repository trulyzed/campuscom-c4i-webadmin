import { IField, MULTI_SELECT_DROPDOWN, } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { SubjectQueries } from "~/packages/services/Api/Queries/AdminQueries/Subjects"

export const getSubjectTaggingFormMeta = (storeId: string): IField[] => {
  return [
    {
      label: "Subjects",
      inputType: MULTI_SELECT_DROPDOWN,
      fieldName: "subjects",
      refLookupService: QueryConstructor(() => SubjectQueries.getPaginatedList({params: {store: storeId}}), [SubjectQueries.getPaginatedList]),
      displayKey: "title",
      valueKey: "id",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}

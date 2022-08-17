import { IField, MULTI_SELECT_GROUP_CHECKBOX } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getRegistrationQuestionTaggingFormMeta = (courseId: string): IField[] => {
  return [
    {
      label: 'Questions',
      fieldName: 'question_banks',
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      refLookupService: QueryConstructor(() => QuestionQueries.getList({params: {exclude_from: 'registration_question', include_null: true, exclude_tagged: courseId, provider_ref: courseId}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: processQuestions(resp.data)}]}) : resp), [QuestionQueries.getList]),
      displayKey2: "question",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }],
    },
  ]
}

import { IField, DROPDOWN, MULTI_SELECT_GROUP_CHECKBOX } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"


export const getProfileQuestionTaggingFormMeta = (store: string): IField[] => {
  return [
    {
      label: 'Respondent Type',
      fieldName: 'respondent_type',
      inputType: DROPDOWN,
      options: [
        { value: 'purchaser', label: 'Purchaser' },
        { value: 'student', label: 'Student' },
      ],
      rules: [{ required: true, message: "This field is required!" }]
    },
    {
      label: 'Questions',
      fieldName: 'question_banks',
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      refLookupService: QueryConstructor((...args) => QuestionQueries.getList(...args).then(resp => resp.success ? ({...resp, data: [{group: '', options: processQuestions(resp.data)}]}) : resp), [QuestionQueries.getList]),
      displayKey2: "question",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }],
      dependencies: ['respondent_type'],
      onDependencyChange: (value, {loadOptions}) => {loadOptions?.({params: {exclude_from: 'profile_question', include_null: true, exclude_tagged: store, provider_ref: store, respondent_type: value?.respondent_type}})},
    },
  ]
}

import { IField, DROPDOWN, MULTI_SELECT_GROUP_CHECKBOX } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { processQuestions } from "~/packages/services/Api/Queries/AdminQueries/Proxy/Questions"
import { QuestionQueries } from "~/packages/services/Api/Queries/AdminQueries/Questions"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"


export const getProfileQuestionTaggingFormMeta = (courseProviderId: string): IField[] => {
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
      refLookupDependencies: ['respondent_type'],
      onDependencyChange: (value, {loadOptions}) => {loadOptions?.({params: {exclude_from: 'profile_question', include_null: true, exclude_tagged: courseProviderId, provider_ref: courseProviderId, respondent_type: value?.respondent_type}})},
    },
  ]
}

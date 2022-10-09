import { IField, MULTI_SELECT_GROUP_CHECKBOX, } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"

export const getPaymentQuestionTaggingFormMeta = (storeId: string): IField[] => {
  return [
    {
      label: "Payment Questions",
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "question_banks",
      refLookupService: QueryConstructor(() => QuestionQueries.getList({params: {include_null: true, exclude_from: 'payment_question', provider_ref: storeId, exclude_tagged: storeId}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: processQuestions(resp.data)}]}) : resp), [QuestionQueries.getList]),
      displayKey2: "question",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}

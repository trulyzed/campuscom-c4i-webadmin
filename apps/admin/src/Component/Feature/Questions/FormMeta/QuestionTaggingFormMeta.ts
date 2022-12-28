import { IField, DROPDOWN, NUMBER, TEXT } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getQuestionTaggingFormMeta = (): IField[] => [
  {
    label: 'Question',
    fieldName: 'question',
    inputType: DROPDOWN,
    refLookupService: QueryConstructor((params) => QuestionQueries.getLookupData({...params, params: {...params?.params, question_type: "select"}}), [QuestionQueries.getLookupData]),
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Options Data Index',
    fieldName: 'options_data_index',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Order',
    fieldName: 'order',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }],
  },
]

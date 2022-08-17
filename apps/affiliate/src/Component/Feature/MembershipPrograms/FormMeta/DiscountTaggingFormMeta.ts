import { IField, MULTI_SELECT_GROUP_CHECKBOX, } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"
import { DiscountProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/DiscountPrograms"


export const getDiscountTaggingFormMeta = (membershipProgramId: string): IField[] => {
  return [
    {
      label: "Discount Programs",
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "discount_programs",
      refLookupService: QueryConstructor(() => DiscountProgramQueries.getTagListByMembershipProgram({params: {id: membershipProgramId}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: processQuestions(resp.data)}]}) : resp), [DiscountProgramQueries.getTagListByMembershipProgram]),
      displayKey2: "title",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}


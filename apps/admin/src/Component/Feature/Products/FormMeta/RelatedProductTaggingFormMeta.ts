import { IField, MULTI_SELECT_GROUP_CHECKBOX, } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { processQuestions } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/Questions"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"

export const getRelatedProductTaggingFormMeta = (productId: string, relationType: string): IField[] => {
  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  return [
    {
      label:  `${capitalizeFirstLetter(relationType)} Products`,
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "optional_products",
      refLookupService: QueryConstructor(() => ProductQueries.getList({params: {product_id: productId,include_null: true, relation_type: relationType}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: processQuestions(resp.data)}]}) : resp), [ProductQueries.getList]),
      displayKey2: "title",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}

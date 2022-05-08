import { IField, MULTI_SELECT_GROUP_CHECKBOX, } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { processQuestions } from "~/packages/services/Api/Queries/AdminQueries/Proxy/Questions"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"

export const getStandaloneProductsTaggingFormMeta = (productId: string): IField[] => {
  return [
    {
      label: "Standalone Products",
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "optional_products",
      refLookupService: QueryConstructor(() => ProductQueries.getList({params: {product_id: productId,include_null: true, relation_type: 'standalone'}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: processQuestions(resp.data)}]}) : resp), [ProductQueries.getList]),
      displayKey2: "title",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}

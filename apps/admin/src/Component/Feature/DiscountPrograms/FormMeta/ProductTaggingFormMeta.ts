import { IField, MULTI_SELECT_GROUP_CHECKBOX, } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"

export const getProductTaggingFormMeta = (discountProgramId: string): IField[] => {
  return [
    {
      label: "Products",
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "products",
      refLookupService: QueryConstructor(() => ProductQueries.getPaginatedList({params: {discount_program: discountProgramId, addable_discount_product: true, type: 'product', operator: 'in'}}).then(resp => resp.success ? ({...resp, data: [{group: '', options: resp.data}]}) : resp), [ProductQueries.getPaginatedList]),
      displayKey2: "title",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}

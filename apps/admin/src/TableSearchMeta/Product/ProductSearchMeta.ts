import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

export const ProductSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title__icontains",
  },
  {
    label: "Type",
    fieldName: "product_type",
    inputType: DROPDOWN,
    options: [
      { value: 'section',label: 'Section', },
      { value: 'certificate',label: 'Certificate', },
      { value: 'membership',label: 'Membership', },
      { value: 'miscellaneous',label: 'Miscellaneous', },
    ]
  }
]

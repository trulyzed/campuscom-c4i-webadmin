import { DROPDOWN, IField, NUMBER, TEXT, TEXTAREA } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const ProductFormMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Title',
    fieldName: 'title',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Product Type',
    fieldName: 'product_type',
    options: [
      {
        value: 'miscellaneous',
        label: 'Miscellaneous',
      }
    ],
    inputType: DROPDOWN,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Tax Code',
    fieldName: 'tax_code',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Fee',
    fieldName: 'fee',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Minimum Fee',
    fieldName: 'minimum_fee',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  // {
  //   label: 'Image',
  //   fieldName: 'image',
  //   inputType: IMAGE,
  // },
  {
    label: 'Content',
    fieldName: 'content',
    inputType: TEXTAREA,
  },
]

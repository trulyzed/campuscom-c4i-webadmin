import { DROPDOWN, IField, DATE_PICKER } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"


export const TransactionSearchMeta: IField[] = [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    fieldName: "cart__cart_items__product__store_course_section__section__course__course_provider",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true,
  },
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "cart__store",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "payment_transactions__transaction_time__lt"
  },
]

export const TransactionSearchMeta2: IField[] = [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    fieldName: "cart__cart_items__product__store_course_section__section__course__course_provider",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true,
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "cart__store",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "payment_transactions__transaction_time__lt"
  },
]

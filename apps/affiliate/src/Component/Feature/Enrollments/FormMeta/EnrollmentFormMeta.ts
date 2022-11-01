import { DROPDOWN, IField, TEXTAREA } from "@packages/components/lib/Form/common"
import { ContactGroupQueries } from "@packages/services/lib/Api/Queries/AdminQueries/ContactGroups"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getEnrollmentFormMeta = (course?: any): IField[] => [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: "Order Type",
    inputType: DROPDOWN,
    fieldName: "order_type",
    options: [
      {label: "Group Order", value: "group_order"},
      {label: "Profile Order", value: "profile_order"},
    ],
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Contact Group",
    inputType: DROPDOWN,
    fieldName: "contact_group",
    refLookupService: ContactGroupQueries.getList,
    displayKey: "title",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['store', 'order_type'],
    onDependencyChange: (value, { toggleField, loadOptions }) => {
      toggleField?.(value?.store && (value?.order_type === 'group_order'))
      loadOptions?.({params: {store: value?.store}})
    },
  },
  {
    label: "Profile",
    inputType: DROPDOWN,
    fieldName: "profile",
    refLookupService: ContactQueries.getList,
    displayKey: "primary_email",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['store', 'order_type'],
    onDependencyChange: (value, { toggleField, loadOptions }) => {
      toggleField?.(value?.store && (value?.order_type === 'profile_order'))
      loadOptions?.({params: {profile_stores__store: value?.store}})
    },
  },
  {
    label: "Product",
    inputType: DROPDOWN,
    fieldName: "product",
    refLookupService: ProductQueries.getList,
    displayKey: "title",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Payment Note",
    inputType: TEXTAREA,
    fieldName: "payment_note",
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: "Payment Ref",
    inputType: TEXTAREA,
    fieldName: "payment_ref",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

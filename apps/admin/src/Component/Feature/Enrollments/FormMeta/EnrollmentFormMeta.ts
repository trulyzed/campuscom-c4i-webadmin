import { DROPDOWN, IField, TEXTAREA } from "~/packages/components/Form/common"
import { ContactGroupQueries } from "~/packages/services/Api/Queries/AdminQueries/ContactGroups"
import { ContactQueries } from "~/packages/services/Api/Queries/AdminQueries/Contacts"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
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
  },
  {
    label: "Order Type",
    inputType: DROPDOWN,
    fieldName: "order_type",
    options: [
      {label: "Group Enrollment", value: "group_order"},
      {label: "Profile Enrollment", value: "profile_order"},
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
    renderDependencies: ['store', 'order_type'],
    refLookupDependencies: ['store'],
    onDependencyChange: (value, {loadOptions}) => {
      loadOptions?.({params: {store: value.store}})
      return value?.store && value?.order_type === 'group_order'
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
    renderDependencies: ['store', 'order_type'],
    refLookupDependencies: ['store'],
    onDependencyChange: (value, {hasFieldUpdated, loadOptions}) => {
      console.log('xxxxxxxxxxxxxxxx')
      hasFieldUpdated?.('store') && loadOptions?.({params: {profile_stores__store: value.store}})
      return  value?.store && value?.order_type === 'profile_order'
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
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Payment Ref",
    inputType: TEXTAREA,
    fieldName: "payment_ref",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

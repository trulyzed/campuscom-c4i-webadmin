import { BOOLEAN, DATE_PICKER, DROPDOWN, IField, NUMBER, TEXT } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const MembershipProgramFormMeta: IField[] = [
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
    inputType: TEXT,
    fieldName: 'title',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Discount Amount',
    inputType: NUMBER,
    fieldName: 'discount_amount',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Type',
    inputType: DROPDOWN,
    fieldName: 'type',
    rules: [{ required: true, message: "This field is required!" }],
    options: [
      { value: 'fixed', label: 'Fixed', },
      { value: 'percentage', label: 'Percentage',},
    ]
  },
  {
    label: 'Code',
    inputType: TEXT,
    fieldName: 'code',
  },
  {
    label: 'Max Limit',
    inputType: NUMBER,
    fieldName: 'max_limit',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Usage Limit',
    inputType: NUMBER,
    fieldName: 'usage_limit',
  },
  {
    label: 'Profile Usage Limit',
    inputType: NUMBER,
    fieldName: 'profile_usage_limit',
  },
  {
    label: 'Start Date',
    inputType: DATE_PICKER,
    fieldName: 'start_date',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'End Date',
    inputType: DATE_PICKER,
    fieldName: 'end_date',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Is Stackable',
    inputType: BOOLEAN,
    fieldName: 'is_stackable',
  },
  {
    label: 'Is Published',
    inputType: BOOLEAN,
    fieldName: 'is_published',
  },
]

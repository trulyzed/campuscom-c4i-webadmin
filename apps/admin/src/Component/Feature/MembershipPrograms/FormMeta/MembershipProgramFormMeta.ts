import { INPUT_OPTIONS } from "~/Configs/input"
import { BOOLEAN, DATE_PICKER, DROPDOWN, EDITOR, IField, NUMBER, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
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
    label: 'Membership Type',
    inputType: DROPDOWN,
    fieldName: 'membership_type',
    rules: [{ required: true, message: "This field is required!" }],
    options: INPUT_OPTIONS.MEMBERSHIP_TYPE
  },
  {
    label: 'Duration',
    inputType: NUMBER,
    fieldName: 'duration',
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['membership_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.membership_type === 'time_based')
    },
  },
  {
    label: 'Start Date',
    inputType: DATE_PICKER,
    fieldName: 'start_date',
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['membership_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.membership_type === 'date_based')
    },
  },
  {
    label: 'End Date',
    inputType: DATE_PICKER,
    fieldName: 'end_date',
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['membership_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.membership_type === 'date_based')
    },
  },
  {
    label: 'Fee',
    inputType: NUMBER,
    fieldName: 'fee',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Description',
    inputType: EDITOR,
    fieldName: 'description',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Is Published',
    inputType: BOOLEAN,
    fieldName: 'is_published',
  },
]

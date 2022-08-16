import { DROPDOWN, IField, TEXT, NUMBER, DATE_PICKER, MULTI_SELECT_DROPDOWN } from "~/packages/components/Form/common"
import { InstructorQueries } from "~/packages/services/Api/Queries/AdminQueries/Instructors"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const SectionFormMeta: IField[] = [
  {
    label: 'Section Name',
    fieldName: 'name',
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
    label: 'Number of Seat',
    fieldName: 'seat_capacity',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Available Seat',
    fieldName: 'available_seat',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Instructors",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "instructors",
    refLookupService: InstructorQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
  },
  {
    label: 'Execution Mode',
    fieldName: 'execution_mode',
    inputType: DROPDOWN,
    options: [
      { value: 'self-paced', label: 'Self-paced' },
      { value: 'instructor-led', label: 'Instructor led' },
    ],
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Credit Hours',
    fieldName: 'credit_hours',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'CEUs',
    fieldName: 'ceu_hours',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Start Date',
    fieldName: 'start_date',
    inputType: DATE_PICKER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'End Date',
    fieldName: 'end_date',
    inputType: DATE_PICKER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Final Enrollment Date',
    fieldName: 'registration_deadline',
    inputType: DATE_PICKER,
    rules: [{ required: true, message: "This field is required!" }]
  },

]

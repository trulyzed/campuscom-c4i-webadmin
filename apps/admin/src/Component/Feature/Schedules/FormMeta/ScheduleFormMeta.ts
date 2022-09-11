import { IField, TEXT, DATE_PICKER } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getScheduleFormMeta = (): IField[] => [
  {
    label: 'Name',
    fieldName: 'name',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Meeting Type',
    fieldName: 'section_type',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Start At',
    fieldName: 'start_at',
    inputType: DATE_PICKER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'End At',
    fieldName: 'end_at',
    inputType: DATE_PICKER,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Building Name',
    fieldName: 'building_name',
    inputType: TEXT,
  },
  {
    label: 'Building Code',
    fieldName: 'building_code',
    inputType: TEXT,
  },
  {
    label: 'Room Name',
    fieldName: 'room_name',
    inputType: TEXT,
  },
]

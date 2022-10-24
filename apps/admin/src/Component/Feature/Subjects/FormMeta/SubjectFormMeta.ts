import { IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { BOOLEAN, DATE_PICKER, DROPDOWN, EDITOR, FILE, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getSubjectFormMeta = (): IField[] => [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    autoSelectDefault: true
  },
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title",
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Description',
    inputType: EDITOR,
    fieldName: "description",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Image',
    inputType: FILE,
    fieldName: "image_file",
    previewKey: "image",
    accept: IMAGE_INPUT_FORMAT,
  },
  {
    label: 'Start Date',
    inputType: DATE_PICKER,
    fieldName: 'start_date',
  },
  {
    label: 'End Date',
    inputType: DATE_PICKER,
    fieldName: 'end_date',
  },
  {
    label: 'Is Published',
    inputType: BOOLEAN,
    fieldName: 'is_published',
  },
]

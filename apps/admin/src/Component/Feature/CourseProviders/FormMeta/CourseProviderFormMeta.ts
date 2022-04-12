import { IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { IField, TEXT, FILE, EDITOR, TEXTAREA } from "~/packages/components/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const CourseProviderFormMeta: IField[] = [
  {
    label: 'Name',
    fieldName: 'name',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Code',
    fieldName: 'code',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Summary',
    fieldName: 'summary',
    inputType: EDITOR,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Website',
    fieldName: 'website_url',
    inputType: TEXT,
  },
  {
    label: 'Description',
    fieldName: 'description',
    inputType: EDITOR,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Logo',
    inputType: FILE,
    fieldName: 'image_file',
    previewKey: "course_provider_logo_uri",
    accept: IMAGE_INPUT_FORMAT,
  },
  {
    label: 'Refund Email',
    fieldName: 'refund_email',
    inputType: TEXT,
  },
  {
    label: 'Configuration',
    fieldName: 'configuration',
    inputType: TEXTAREA,
    rules: [{ required: true, message: "This field is required!" }]
  },
]

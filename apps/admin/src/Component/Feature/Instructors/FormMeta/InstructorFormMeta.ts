import { IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { DROPDOWN, EDITOR, FILE, IField, TEXT } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getInstructorFormMeta =(): IField[] => [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name",
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    fieldName: "provider",
    refLookupService: CourseProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    autoSelectDefault: true
  },
  {
    label: 'External ID',
    inputType: TEXT,
    fieldName: "external_id",
    maxLength: 50,
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
    label: 'Short Bio',
    inputType: EDITOR,
    fieldName: "short_bio",
  },
  {
    label: 'Detail Bio',
    inputType: EDITOR,
    fieldName: "detail_bio",
  },
]

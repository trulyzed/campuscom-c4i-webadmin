import { IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { DROPDOWN, FILE, IField, TEXT, TEXTAREA } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const InstructorFormMeta: IField[] = [
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
    rules: [{ required: true, message: "This field is required!" }]
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
    inputType: TEXTAREA,
    fieldName: "short_bio",
    maxLength: 50,
  },
  {
    label: 'Detail Bio',
    inputType: TEXTAREA,
    fieldName: "detail_bio",
    maxLength: 50,
  },
]

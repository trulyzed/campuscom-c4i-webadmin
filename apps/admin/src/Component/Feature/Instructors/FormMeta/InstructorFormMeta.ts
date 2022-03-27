import { DROPDOWN, IField, TEXT, TEXTAREA } from "~/packages/components/Form/common"
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
  // {
  //   label: 'Image',
  //   inputType: TEXT,
  //   fieldName: "course_image_uri",
  //   maxLength: 50,
  // },
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

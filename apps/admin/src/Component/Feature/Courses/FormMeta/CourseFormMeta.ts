import { BOOLEAN, DROPDOWN, IField, TEXT, TEXTAREA, FILE } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const CourseFormMeta: IField[] = [
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
    label: "Title",
    inputType: TEXT,
    fieldName: "title",
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Code",
    inputType: TEXT,
    fieldName: "code",
    maxLength: 50,
  },
  {
    label: "Inquiry URL",
    inputType: TEXT,
    fieldName: "inquiry_url",
    maxLength: 50,
  },
  {
    label: 'External ID',
    inputType: TEXT,
    fieldName: "external_id",
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'External URL',
    inputType: TEXT,
    fieldName: "external_url",
    maxLength: 50,
  },
  {
    label: 'Slug',
    inputType: TEXT,
    fieldName: "slug",
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Level",
    inputType: DROPDOWN,
    fieldName: "level",
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ]
  },
  {
    label: 'Summary',
    inputType: TEXT,
    fieldName: "summary",
    maxLength: 50,
  },
  {
    label: 'Description',
    inputType: TEXTAREA,
    fieldName: "description",
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Learning Outcome',
    inputType: TEXTAREA,
    fieldName: "learning_outcome",
    maxLength: 50,
  },
  {
    label: 'Image',
    inputType: FILE,
    fieldName: "course_image",
    previewKey: "course_image_uri",
    accept: '',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Syllabus URL',
    inputType: TEXT,
    fieldName: "syllabus_url",
    maxLength: 50,
  },
  {
    label: 'Content Ready',
    inputType: BOOLEAN,
    fieldName: "content_ready",
    maxLength: 50,
  },
]

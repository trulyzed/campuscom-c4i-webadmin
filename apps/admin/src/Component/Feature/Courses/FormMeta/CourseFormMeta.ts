import { IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { BOOLEAN, DROPDOWN, IField, TEXT, FILE, EDITOR } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getCourseFormMeta = (course?: any): IField[] => [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    fieldName: "provider",
    refLookupService: CourseProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    autoSelectSingle: true
  },
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title",
    disabled: !!course?.from_importer,
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Code",
    inputType: TEXT,
    fieldName: "code",
    disabled: !!course?.from_importer,
    maxLength: 50,
  },
  {
    label: "Inquiry URL",
    inputType: TEXT,
    fieldName: "inquiry_url",
    disabled: !!course?.from_importer,
    maxLength: 50,
  },
  {
    label: 'External ID',
    inputType: TEXT,
    fieldName: "external_id",
    disabled: !!course?.from_importer,
    maxLength: 50,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'External URL',
    inputType: TEXT,
    fieldName: "external_url",
    disabled: !!course?.from_importer,
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
    inputType: EDITOR,
    fieldName: "description",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Learning Outcome',
    inputType: EDITOR,
    fieldName: "learning_outcome",
  },
  {
    label: 'Image',
    inputType: FILE,
    fieldName: "image_file",
    previewKey: "course_image_uri",
    accept: IMAGE_INPUT_FORMAT,
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

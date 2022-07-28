import { DROPDOWN, FILE, IField } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const ImportTaskFormMeta: IField[] = [
  {
    label: 'Import Type',
    fieldName: 'import_type',
    inputType: DROPDOWN,
    options: [
      { value: 'course', label: 'Course', },
      { value: 'section', label: 'Section',},
      { value: 'contact', label: 'Contact',},
    ],
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    fieldName: "course_provider",
    refLookupService: CourseProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['import_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.import_type === 'course' || value?.import_type === 'section')
    }
  },
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['import_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.import_type === 'contact')
    }
  },
  {
    label: 'Upload File',
    inputType: FILE,
    fieldName: 'filename',
    accept: '.xlsx',
    rules: [{ required: true, message: "This field is required!" }],
  },
]

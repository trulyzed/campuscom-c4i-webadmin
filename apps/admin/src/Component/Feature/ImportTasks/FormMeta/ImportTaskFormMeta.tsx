import { CUSTOM_FIELD, DROPDOWN, FILE, IField } from "@packages/components/lib/Form/common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getImportTaskFormMeta = (): IField[] => [
  {
    label: 'Import Type',
    fieldName: 'import_type',
    inputType: DROPDOWN,
    options: [
      { value: 'course', label: 'Course', },
      { value: 'section', label: 'Section', },
      { value: 'contact', label: 'Contact', },
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
    onDependencyChange: (value, { toggleField }) => {
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
    onDependencyChange: (value, { toggleField }) => {
      toggleField?.(value?.import_type === 'contact')
    },
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: 'Upload File',
    inputType: FILE,
    fieldName: 'filename',
    accept: '.xlsx',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Course file format',
    inputType: CUSTOM_FIELD,
    fieldName: 'course_file_format',
    customFilterComponent: () => renderLink(`${process.env.REACT_APP_CDN_URL}samples/sample-course.xlsx`, 'Download Sample', false, true),
    formItemStyle: { marginBottom: '5px' },
  },
  {
    label: 'Section file format',
    inputType: CUSTOM_FIELD,
    fieldName: 'section_file_format',
    customFilterComponent: () => renderLink(`${process.env.REACT_APP_CDN_URL}samples/sample-section.xlsx`, 'Download Sample', false, true),
    formItemStyle: { marginBottom: '5px' },
  },
  {
    label: 'Contact file format',
    inputType: CUSTOM_FIELD,
    fieldName: 'contact_file_format',
    customFilterComponent: () => renderLink(`${process.env.REACT_APP_CDN_URL}samples/sample-contact.xlsx`, 'Download Sample', false, true),
    formItemStyle: { marginBottom: '5px' },
  },
]

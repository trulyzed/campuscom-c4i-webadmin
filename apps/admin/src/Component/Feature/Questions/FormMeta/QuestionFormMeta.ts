import { BATCH_FILE_INPUT_FORMAT, INPUT_OPTIONS } from "~/Configs/input"
import { IField, TEXT, FILE, EDITOR, DROPDOWN, TEXTAREA, BOOLEAN, NUMBER, MULTI_SELECT_DROPDOWN } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { GlobalConfigurationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/GlobalConfigurations"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const QuestionFormMeta: IField[] = [
  {
    label: 'Provider Type',
    fieldName: 'provider_type',
    inputType: DROPDOWN,
    options: [
      {
        value: 'course_provider',
        label: 'Course Provider',
      },
      {
        value: 'store',
        label: 'Store',
      },
    ]
  },
  {
    label: 'Course Provider',
    fieldName: 'course_provider',
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['provider_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.provider_type === 'course_provider')
    },
    autoSelectDefault: true
  },
  {
    label: 'Store',
    fieldName: 'store',
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['provider_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.provider_type === 'store')
    },
    autoSelectDefault: true
  },
  {
    label: 'External ID',
    fieldName: 'external_id',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Title',
    fieldName: 'title',
    inputType: EDITOR,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Type',
    fieldName: 'question_type',
    inputType: DROPDOWN,
    options: INPUT_OPTIONS.QUESTION_TYPE,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Is Autocomplete',
    fieldName: 'autocomplete',
    inputType: BOOLEAN,
    dependencies: ['question_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.question_type === 'select')
    },
  },
  {
    label: 'Options',
    fieldName: 'options',
    inputType: TEXTAREA,
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['question_type', 'autocomplete'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.question_type === 'select' && !value?.autocomplete)
    },
  },
  {
    label: 'Option File',
    fieldName: 'option_file',
    inputType: FILE,
    accept: BATCH_FILE_INPUT_FORMAT,
    dependencies: ['autocomplete'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.autocomplete)
    },
  },
  {
    label: 'Is Multiple',
    fieldName: 'multiple',
    inputType: BOOLEAN,
    dependencies: ['question_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.question_type === 'attachment')
    },
  },
  {
    label: 'Max File Size',
    fieldName: 'max_file_size',
    inputType: NUMBER,
    dependencies: ['question_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.question_type === 'attachment')
    },
  },
  {
    label: 'Accepted File Types',
    fieldName: 'file_types',
    refLookupService: GlobalConfigurationQueries.getLookupDataOfAcceptedFileTypeOfAttachmentQuestion,
    displayKey: "name",
    valueKey: "id",
    inputType: MULTI_SELECT_DROPDOWN,
    dependencies: ['question_type'],
    onDependencyChange: (value, {toggleField}) => {
      toggleField?.(value?.question_type === 'attachment')
    },
  },
  {
    label: 'Is Required',
    fieldName: 'required',
    inputType: BOOLEAN,
  },
  {
    label: 'Default Value',
    fieldName: 'default_value',
    inputType: TEXT,
  },
  {
    label: 'Placeholder',
    fieldName: 'placeholder',
    inputType: TEXT,
  },
  {
    label: 'Help Text',
    fieldName: 'help_text',
    inputType: TEXT,
  },
]

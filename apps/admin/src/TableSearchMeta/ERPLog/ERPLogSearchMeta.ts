import { IField, DATE_PICKER, TEXT, DROPDOWN } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"

export const ERPLogSearchMeta: IField[] = [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    fieldName: "course_provider",
    displayKey: "name",
    valueKey: "id",
    autoSelectSingle: true
  },
  {
    label: "From Date",
    inputType: DATE_PICKER,
    fieldName: "from_date",
  },
  {
    label: "To Date",
    inputType: DATE_PICKER,
    fieldName: "to_date",
  },
  {
    label: "Summary",
    inputType: TEXT,
    fieldName: "summary",
  },
]

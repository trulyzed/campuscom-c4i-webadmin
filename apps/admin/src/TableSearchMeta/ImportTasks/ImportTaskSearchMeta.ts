import { DROPDOWN, IField, DATE_PICKER, TEXT } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const ImportTaskSearchMeta: IField[] = [
  {
    label: "Import Task ID",
    inputType: TEXT,
    fieldName: "ref_id",
  },
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    fieldName: "course_provider",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true
  },
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true
  },
  {
    label: 'Status',
    inputType: DROPDOWN,
    fieldName: 'status',
    options: [
      { value: 'in_progress', label: 'In Progress', },
      { value: 'failed', label: 'Failed', },
      { value: 'completed', label: 'Completed', },
    ]
  },
  {
    label: 'Start Date',
    fieldName: 'created_at__gte',
    inputType: DATE_PICKER,
  },
  {
    label: 'End Date',
    fieldName: 'created_at__lte',
    inputType: DATE_PICKER,
  },
]

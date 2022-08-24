import { DROPDOWN, IField, DATE_PICKER } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const TransactionSearchMeta: IField[] = [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    fieldName: "course_provider__id",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true
  },
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store__id",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "start_date__gte"
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "end_date__lt"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "status",
    options: [
      { value: 'settled', label: 'Settled' },
      { value: 'unsettled', label: 'Unsettled' },
    ]
  }
]

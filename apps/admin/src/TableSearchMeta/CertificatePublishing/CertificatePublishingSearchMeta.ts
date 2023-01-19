import { INPUT_OPTIONS } from "~/Configs/input"
import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const getCertificatePublishingSearchMeta = (): IField[] => [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id",
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title",
  },
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
    label: "Status",
    inputType: DROPDOWN,
    fieldName: 'status',
    options: [
      { value: 'ready/available', label: 'Ready/Available', },
      { value: 'published', label: 'Published', },
      { value: 'unpublished', label: 'Unpublished', }
    ]
  },
  {
    label: "Active Status",
    inputType: DROPDOWN,
    fieldName: "active_status",
    options: INPUT_OPTIONS.ACTIVE_STATUS
  }
]

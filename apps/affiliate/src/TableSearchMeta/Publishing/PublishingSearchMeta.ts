import { INPUT_OPTIONS } from "~/Configs/input"
import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

export const PublishingSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id"
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
    valueKey: "id"
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

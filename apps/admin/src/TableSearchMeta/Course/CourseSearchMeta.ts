import { INPUT_OPTIONS } from "~/Configs/input"
import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"

export const CourseSearchMeta: IField[] = [
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title__icontains"
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
    label: "Slug",
    inputType: TEXT,
    fieldName: "slug"
  },
  {
    label: "Content Ready",
    inputType: DROPDOWN,
    fieldName: "content_ready",
    options: [
      { label: "Ready", value: "True" },
      { label: "Not Ready", value: "False" }
    ]
  },
  {
    label: "Active Status",
    inputType: DROPDOWN,
    fieldName: "active_status",
    options: INPUT_OPTIONS.ACTIVE_STATUS
  }
]

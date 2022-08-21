import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"

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
    valueKey: "id",
    autoSelectDefault: true
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
  }
]

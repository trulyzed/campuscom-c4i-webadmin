import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "~/ApiServices/Queries/CourseProviders"

export const CourseSearchMeta: IField[] = [
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title__icontains"
  },
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: () =>
      CourseProviderQueries.getList!().then(data => {
        return data
      }),
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
  }
]

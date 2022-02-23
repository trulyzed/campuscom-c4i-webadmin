import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { Apis } from "~/ApiServices/Apis"
import { endpoints } from "~/ApiServices/Endpoints"

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
      Apis[endpoints.COURSE_PROVIDER]({ limit: 1000 }).then((response) => {
        response = {
          data: response.data,
          success: true,
          error: false,
          code: 200
        }
        return response
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

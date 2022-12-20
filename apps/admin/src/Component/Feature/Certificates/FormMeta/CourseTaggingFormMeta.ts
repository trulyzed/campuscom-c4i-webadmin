import { IField, MULTI_SELECT_DROPDOWN } from "@packages/components/lib/Form/common"
import { CourseQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Courses"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getCourseTaggingFormMeta = (certificate?: any): IField[] => [
  {
    label: "Courses",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "courses",
    refLookupService: CourseQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
]

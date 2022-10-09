import { BOOLEAN, DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const CourseSharingContractFormMeta: IField[] = [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    fieldName: "course_provider",
    refLookupService: CourseProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    autoSelectDefault: true
  },
  {
    label: 'Is Active',
    inputType: BOOLEAN,
    fieldName: "is_active",
    maxLength: 50,
  },
]

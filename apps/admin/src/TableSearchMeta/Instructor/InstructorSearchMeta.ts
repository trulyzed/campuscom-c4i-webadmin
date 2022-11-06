import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { CourseProviderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseProviders"

export const InstructorSearchMeta: IField[] = [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    fieldName: "provider__id",
    displayKey: "name",
    valueKey: "id",
    autoSelectSingle: true
  },
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
]

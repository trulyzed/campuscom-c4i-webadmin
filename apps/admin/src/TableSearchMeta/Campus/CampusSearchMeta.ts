import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"

export const CampusSearchMeta: IField[] = [
  {
    label: "Course Provider",
    inputType: DROPDOWN,
    refLookupService: CourseProviderQueries.getLookupData,
    fieldName: "provider__id",
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
]

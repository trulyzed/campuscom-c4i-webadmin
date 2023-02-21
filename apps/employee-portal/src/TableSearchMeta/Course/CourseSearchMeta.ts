import { IField, MULTI_SELECT_DROPDOWN, TEXT } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { SkillQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Skills"

export const CourseSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
  {
    label: "Skills",
    inputType: MULTI_SELECT_DROPDOWN,
    refLookupService: QueryConstructor(params => SkillQueries.getLookupData(params), [SkillQueries.getLookupData]),
    fieldName: "skills",
    valueKey: 'id',
    displayKey: 'name'
  },
]

import { IField, MULTI_SELECT_DROPDOWN } from "@packages/components/lib/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { SkillQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Skills"

export const getSkillTaggingFormMeta = (employeeID?: string):IField[] => [
  {
    label: "Skills",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "skills",
    refLookupService: QueryConstructor((params) => SkillQueries.getLookupData({...params, params: {...params?.params, employee: employeeID}}), [SkillQueries.getLookupData]),
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
]

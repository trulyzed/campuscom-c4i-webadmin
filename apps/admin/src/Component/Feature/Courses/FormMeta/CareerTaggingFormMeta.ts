import { IField, MULTI_SELECT_DROPDOWN, MULTI_SELECT_GROUP_CHECKBOX, NUMBER, } from "~/packages/components/Form/common"
import { CareerQueries } from "~/packages/services/Api/Queries/AdminQueries/Careers"

export const getCareerTaggingFormMeta = (): IField[] => {
  return [
    {
      label: "Careers",
      inputType: MULTI_SELECT_DROPDOWN,
      fieldName: "careers",
      refLookupService: CareerQueries.getList,
      displayKey: "name",
      valueKey: "id",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      label: "Threshold",
      inputType: NUMBER,
      fieldName: "threshold",
      initialValue: 50
    },
    {
      label: 'Competencies',
      fieldName: 'skills',
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      refLookupService: CareerQueries.getSkillsByCareer,
      displayKey2: "name",
      valueKey2: "id",
      rules: [{ required: true, message: "This field is required!" }],
      refLookupDependencies: ['careers', 'threshold'],
      onDependencyChange: (value, {loadOptions}) => {loadOptions?.({params: {occupation_ids: (value?.careers as any[] || []).join(','), threshold: value?.threshold || 0}}, !value?.careers?.length)},
    },
  ]
}

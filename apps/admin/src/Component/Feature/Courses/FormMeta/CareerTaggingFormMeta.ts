import { IField, MULTI_SELECT_DROPDOWN, } from "~/packages/components/Form/common"
import { CareerQueries } from "~/packages/services/Api/Queries/AdminQueries/Careers"

export const getCareerTaggingFormMeta = (courseId: string): IField[] => {
  return [
    {
      label: "Careers",
      inputType: MULTI_SELECT_DROPDOWN,
      fieldName: "careers",
      refLookupService: CareerQueries.getList,
      displayKey: "name",
      valueKey: "id",
    },
  ]
}

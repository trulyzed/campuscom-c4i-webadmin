import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { DepartmentQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Departments"

export const EmployeeSearchMeta: IField[] = [
  {
    label: "Department",
    inputType: DROPDOWN,
    refLookupService: DepartmentQueries.getLookupData,
    fieldName: "department",
    displayKey: "name",
    valueKey: "id",
  },
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains",
  },
]

import { DROPDOWN, IField, DATE_PICKER, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const ImportTaskSearchMeta: IField[] = [
  {
    label: "Ref Id",
    inputType: TEXT,
    fieldName: "ref_id",
  },
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: 'Status',
    inputType: DROPDOWN,
    fieldName: 'status',
    options: [
      { value: 'in_progress', label: 'In Progress', },
      { value: 'failed', label: 'Failed', },
      { value: 'completed', label: 'Completed', },
    ]
  },
  {
    label: 'Start Date',
    fieldName: 'created_at__gte',
    inputType: DATE_PICKER,
  },
  {
    label: 'End Date',
    fieldName: 'created_at__lte',
    inputType: DATE_PICKER,
  },
]

import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const PendingEnrollmentSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id",
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: "Enrollment ID",
    inputType: TEXT,
    fieldName: "ref_id",
  },
  {
    label: "Approval Status",
    inputType: DROPDOWN,
    fieldName: "approval_status",
    options: [
      {label: 'Pending', value: 'pending'},
      {label: 'Canceled', value: 'canceled'},
    ]
  },
]

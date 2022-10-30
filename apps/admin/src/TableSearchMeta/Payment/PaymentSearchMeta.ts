import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const PaymentSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store_payment_gateway__store",
    displayKey: "name",
    valueKey: "id",
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "status",
    options: [
      { value: 'initiated', label: 'Initiated'},
      { value: 'in_progress', label: 'In Progress'},
      { value: 'awaiting_verification', label: 'Awaiting Verification'},
      { value: 'completed', label: 'Completed'},
      { value: 'HFRFailed', label: 'HFRFailed'},
      { value: 'cancelled', label: 'Cancelled'},
      { value: 'failed', label: 'Failed'},
    ]
  }
]

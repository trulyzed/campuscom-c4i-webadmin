import { DROPDOWN, IField, DATE_PICKER } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

export const RefundSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "payment__store_payment_gateway__store",
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: "From Date",
    inputType: DATE_PICKER,
    fieldName: "created_at__gte"
  },
  {
    label: "To Date",
    inputType: DATE_PICKER,
    fieldName: "created_at__lte"
  },
  {
    label: "Refund Status",
    inputType: DROPDOWN,
    fieldName: "status",
    options: [
      { value:'requested', label: 'Requested',},
      { value:'awaiting_verification', label: 'Awaiting Verification',},
      { value:'refunded', label: 'Refunded',},
      { value:'failed', label: 'Failed',},
    ]
  },
]

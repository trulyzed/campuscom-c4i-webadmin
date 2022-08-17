import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const OrderSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id"
  },
  // {
  //   label: 'From Date',
  //   fieldName: 'created_at__gte',
  //   inputType: DATE_PICKER,
  // },
  // {
  //   label: 'To Date',
  //   fieldName: 'created_at__lte',
  //   inputType: DATE_PICKER,
  // },
  {
    label: "Order Tracking ID",
    inputType: TEXT,
    fieldName: "order_ref"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "status",
    options: [
      { value: 'open', label: 'Open' },
      { value: 'payment_in_progress', label: 'Payment In Progress' },
      { value: 'processed', label: 'Processed' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'abandoned', label: 'Abandoned' },
    ]
  }
]

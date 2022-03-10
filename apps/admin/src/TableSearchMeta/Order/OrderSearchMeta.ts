import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

export const OrderSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: () =>
    StoreQueries.getList!().then(data => {
      return data
    }),
    fieldName: "store",
    displayKey: "name",
    valueKey: "id"
  },
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

import { DROPDOWN, IField, TEXT, DATE_PICKER } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

export const TransactionSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store__id",
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: "Transaction Ref.",
    inputType: TEXT,
    fieldName: "transaction_ref"
  },
  {
    label: "Order Id",
    inputType: TEXT,
    fieldName: "order_ref"
  },
  {
    label: "Transaction Date From",
    inputType: DATE_PICKER,
    fieldName: "transaction_date__gte"
  },
  {
    label: "Transaction Date To",
    inputType: DATE_PICKER,
    fieldName: "transaction_date__lte"
  },
  {
    label: "Purchaser Name",
    inputType: TEXT,
    fieldName: "profile__first_name"
  },
  {
    label: "Purchaser Email",
    inputType: TEXT,
    fieldName: "profile__primary_email"
  }
]

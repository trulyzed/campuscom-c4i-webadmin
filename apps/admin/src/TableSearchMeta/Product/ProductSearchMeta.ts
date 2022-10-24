import { INPUT_OPTIONS } from "~/Configs/input"
import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const ProductSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id",
    autoSelectDefault: true
  },
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title__icontains",
  },
  {
    label: "Type",
    fieldName: "product_type",
    inputType: DROPDOWN,
    options: INPUT_OPTIONS.PRODUCT_TYPE
  },
  {
    label: "Active Status",
    inputType: DROPDOWN,
    fieldName: "active_status",
    options: INPUT_OPTIONS.ACTIVE_STATUS
  }
]

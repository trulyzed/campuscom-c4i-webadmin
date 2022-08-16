import { DROPDOWN, IField, TEXT, DATE_PICKER } from "~/packages/components/Form/common"

export const AuditTrailSearchMeta: IField[] = [
  {
    label: "Ref Id",
    inputType: TEXT,
    fieldName: "ref_id",
  },
  {
    label: "Narration",
    inputType: TEXT,
    fieldName: "narration__icontains",
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "source",
    options: [
      { label: "Admin Panel", value: "admin_panel" },
      { label: "Publish API", value: "publish_api" }
    ]
  },
  {
    label: "From Date",
    inputType: DATE_PICKER,
    fieldName: "when__gte",
  },
  {
    label: "To Date",
    inputType: DATE_PICKER,
    fieldName: "when__lte",
  },
]

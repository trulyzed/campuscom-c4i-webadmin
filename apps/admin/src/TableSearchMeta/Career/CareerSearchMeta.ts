import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"

export const CareerSearchMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name__icontains"
  },
  {
    label: 'SOC Code',
    inputType: TEXT,
    fieldName: 'soc_code__icontains',
  },
  {
    label: 'Bright Outlook',
    inputType: DROPDOWN,
    fieldName: 'bright_outlook',
    options: [
      { label: "Yes", value: "True" },
      { label: "No", value: "False" }
    ]
  },
  {
    label: 'Green Status',
    inputType: DROPDOWN,
    fieldName: 'green',
    options: [
      { label: "Yes", value: "True" },
      { label: "No", value: "False" }
    ]
  },
]

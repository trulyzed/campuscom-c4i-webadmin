import { IField, TEXT } from "@packages/components/lib/Form/common"

export const GlobalConfigurationSearchMeta: IField[] = [
  {
    label: "Label",
    inputType: TEXT,
    fieldName: "label__icontains",
  },
]

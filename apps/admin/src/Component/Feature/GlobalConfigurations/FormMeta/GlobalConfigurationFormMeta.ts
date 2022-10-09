import { IField, TEXT, TEXTAREA } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const GlobalConfigurationFormMeta: IField[] = [
  {
    label: 'Label',
    inputType: TEXT,
    fieldName: 'label',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Configuration',
    inputType: TEXTAREA,
    fieldName: 'configuration',
    rules: [{ required: true, message: "This field is required!" }]
  },
]

import { DATE_PICKER, IField, FILE, TEXT, TEXTAREA } from "~/packages/components/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getStoreDomainConfigurationFormMeta = (record?: {[key: string]: any}): IField[] => [
  {
    label: 'Domain',
    inputType: TEXT,
    fieldName: "domain",
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Certificate Expires on',
    fieldName: 'expiry_at',
    inputType: DATE_PICKER,
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Certificate',
    inputType: FILE,
    fieldName: "cert",
    accept: '.pem',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Chain',
    inputType: FILE,
    fieldName: "chain",
    accept: '.pem',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Fullchain',
    inputType: FILE,
    fieldName: "fullchain",
    accept: '.pem',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Private Key File',
    inputType: FILE,
    fieldName: "privkey",
    accept: '.pem',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Config',
    inputType: TEXTAREA,
    fieldName: "config",
  },
  {
    label: 'Note',
    inputType: TEXTAREA,
    fieldName: "note",
  },
]

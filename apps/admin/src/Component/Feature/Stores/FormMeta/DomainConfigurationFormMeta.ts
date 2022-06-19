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
    label: 'Main Certificate File',
    inputType: FILE,
    fieldName: "main_certificate",
    accept: '.pem',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Chain Certificate File',
    inputType: FILE,
    fieldName: "chain_certificate",
    accept: '.pem',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Private Key File',
    inputType: FILE,
    fieldName: "private_key",
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

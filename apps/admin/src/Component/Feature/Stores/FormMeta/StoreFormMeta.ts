import { FILE_INPUT_FORMAT, IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { IField, TEXT, FILE } from "@packages/components/lib/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getStoreFormMeta = (disableUrlSlug?:boolean): IField[] => [
  {
    label: 'Name',
    fieldName: 'name',
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'URL slug',
    fieldName: 'url_slug',
    inputType: TEXT,
    disabled: disableUrlSlug,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'GTM ID',
    fieldName: 'gtm_id',
    inputType: TEXT,
  },
  {
    label: 'Logo',
    fieldName: 'image_file',
    inputType: FILE,
    accept: IMAGE_INPUT_FORMAT,
    previewKey: 'store_logo_uri'
  },
  {
    label: 'Template',
    fieldName: 'template',
    inputType: FILE,
    accept: FILE_INPUT_FORMAT,
  },
]

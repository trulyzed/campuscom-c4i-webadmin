import { CUSTOM_FIELD, DROPDOWN, FILE, IField } from "@packages/components/lib/Form/common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const ImportTaskFormMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'Upload File',
    inputType: FILE,
    fieldName: 'filename',
    accept: '.xlsx',
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: 'File Format',
    inputType: CUSTOM_FIELD,
    fieldName: 'file_format',
    customFilterComponent: () => renderLink(`${process.env.REACT_APP_CDN_URL}samples/sample-contact.xlsx`, 'Download Sample', false, true),
    formItemStyle: { marginBottom: '5px' },
  },
]

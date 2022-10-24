import { SectionPrice } from "~/Component/Form/CustomFormFields/SectionPrice"
import { BOOLEAN, CUSTOM_FIELD, DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getPublishingFormMeta = (): IField[] => [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    autoSelectDefault: true
  },
  {
    label: 'Enrollment Ready',
    fieldName: 'enrollment_ready',
    inputType: BOOLEAN,
  },
  {
    label: 'Is Published',
    fieldName: 'is_published',
    inputType: BOOLEAN,
  },
  {
    label: 'Is Featured',
    fieldName: 'is_featured',
    inputType: BOOLEAN,
  },
  {
    label: "Sections",
    inputType: CUSTOM_FIELD,
    fieldName: "sections",
    customFilterComponent: SectionPrice,
  },
]

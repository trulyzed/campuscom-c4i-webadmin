import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const SubjectSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id",
    defaultPreferenceIndex: 'default_store'
  },
  {
    label: "Title",
    inputType: TEXT,
    fieldName: "title__icontains",
  },
  {
    label: "Is Published",
    inputType: DROPDOWN,
    fieldName: "is_published",
    options: [
      { value: 'True', label: 'Yes'},
      { value: 'False', label: 'No'},
    ]
  }
]

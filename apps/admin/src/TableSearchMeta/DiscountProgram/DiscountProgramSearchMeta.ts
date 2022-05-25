import { DATE_PICKER, DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

export const DiscountProgramSearchMeta: IField[] = [
  {
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    fieldName: "store",
    displayKey: "name",
    valueKey: "id"
  },
  {
    label: 'Title',
    inputType: TEXT,
    fieldName: 'title__icontains',
  },
  {
    label: 'Type',
    inputType: DROPDOWN,
    fieldName: 'type',
    options:[
      { value: 'fixed', label: 'Fixed',},
      { value: 'percentage', label: 'Percentage',},
    ]
  },
  {
    label: 'Start Date',
    inputType: DATE_PICKER,
    fieldName: 'created_at__gte',
  },
  {
    label: 'End Date',
    inputType: DATE_PICKER,
    fieldName: 'created_at__lte',
  },
  {
    label: 'Is Stackable',
    inputType: DROPDOWN,
    fieldName: 'is_stackable',
    options:[
      { value: 'True', label: 'Yes',},
      { value: 'False', label: 'No',},
    ]
  },
  {
    label: 'Is Published',
    inputType: DROPDOWN,
    fieldName: 'is_published',
    options:[
      { value: 'True', label: 'Yes',},
      { value: 'False', label: 'No',},
    ]
  },
]

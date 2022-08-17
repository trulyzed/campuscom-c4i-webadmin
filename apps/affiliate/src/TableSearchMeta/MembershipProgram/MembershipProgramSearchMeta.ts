import { INPUT_OPTIONS } from "~/Configs/input"
import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

export const MembershipProgramSearchMeta: IField[] = [
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
    label: 'Membership Type',
    inputType: DROPDOWN,
    fieldName: 'type',
    options: INPUT_OPTIONS.MEMBERSHIP_TYPE
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

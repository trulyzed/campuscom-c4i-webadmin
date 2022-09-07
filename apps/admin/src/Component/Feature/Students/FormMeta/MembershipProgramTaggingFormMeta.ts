import { IField, DROPDOWN } from "@packages/components/lib/Form/common"
import { MembershipProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/MembershipPrograms"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const MembershipProgramTaggingFormMeta: IField[] = [
  {
    label: 'Membership Program',
    fieldName: 'membership_program',
    inputType: DROPDOWN,
    refLookupService: MembershipProgramQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

import { BOOLEAN, DATE_PICKER, IField, TEXT } from "~/packages/components/Form/common"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const StudentFormMeta: IField[] = [
  {
    label: 'First Name',
    fieldName: 'first_name',
    inputType: TEXT,
  },
  {
    label: 'Last Name',
    fieldName: 'last_name',
    inputType: TEXT,
  },
  {
    label: 'Date of Birth',
    fieldName: 'date_of_birth',
    inputType: DATE_PICKER,
  },
  {
    label: 'Primary Email',
    fieldName: 'primary_email',
    inputType: TEXT,
  },
  {
    label: 'Primary Contact Number',
    fieldName: 'primary_contact_number',
    inputType: TEXT,
  },
  // {
  //   label: 'Profile Picture',
  //   fieldName: 'profile_picture_uri',
  //   inputType: TEXT,
  // },
  {
    label: 'Terms Accepted',
    fieldName: 'terms_accepted',
    inputType: BOOLEAN,
  },
]

import { IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { BOOLEAN, DATE_PICKER, FILE, IField, TEXT } from "@packages/components/lib/Form/common"
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
  {
    label: 'Profile Picture',
    inputType: FILE,
    fieldName: "image_file",
    previewKey: "profile_picture_uri",
    accept: IMAGE_INPUT_FORMAT,
  },
  {
    label: 'Terms Accepted',
    fieldName: 'terms_accepted',
    inputType: BOOLEAN,
  },
]

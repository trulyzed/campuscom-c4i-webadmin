import { IMAGE_INPUT_FORMAT } from "~/Configs/input"
import { BOOLEAN, DROPDOWN, IField, TEXT, TEXTAREA } from "~/packages/components/Form/common"
import { CourseProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/CourseProviders"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const IdentityProviderFormMeta: IField[] = [
  {
    label: 'Provider Type',
    inputType: DROPDOWN,
    fieldName: 'provider_type',
    options: [
      { value: 'oauth2', label: 'OAuth2', },
      { value: 'saml2', label: 'SAML2', }
    ],
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Name',
    inputType: TEXT,
    fieldName: 'name',
    refLookupService: CourseProviderQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Slug',
    inputType: TEXT,
    fieldName: 'slug',
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Is Sandboxed?',
    inputType: BOOLEAN,
    fieldName: 'is_sandboxed',
    previewKey: "image",
    accept: IMAGE_INPUT_FORMAT,
  },
  {
    label: 'Is School Provider?',
    inputType: BOOLEAN,
    fieldName: 'is_school_provider',
  },
  {
    label: 'Configuration',
    inputType: TEXTAREA,
    fieldName: 'configuration',
    rules: [{ required: true, message: "This field is required!" }]
  },
]

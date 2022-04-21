import { IField, DROPDOWN, TEXTAREA } from "~/packages/components/Form/common"
import { ExternalEntityQueries } from "~/packages/services/Api/Queries/AdminQueries/ExternalEntities"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const ConfigurationTaggingFormMeta: IField[] = [
  {
    label: 'Configuration Type',
    fieldName: 'external_entity',
    inputType: DROPDOWN,
    refLookupService: QueryConstructor(() => ExternalEntityQueries.getLookupData({params: {entity_type: 'enrollment_config'}}), [ExternalEntityQueries.getLookupData]),
    displayKey: "entity_name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Configuration Value',
    fieldName: 'config_value',
    inputType: TEXTAREA,
    rules: [{ required: true, message: "This field is required!" }]
  },
]

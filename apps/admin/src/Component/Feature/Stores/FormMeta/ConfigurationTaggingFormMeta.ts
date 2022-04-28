import { IField, DROPDOWN, TEXTAREA } from "~/packages/components/Form/common"
import { ExternalEntityQueries } from "~/packages/services/Api/Queries/AdminQueries/ExternalEntities"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

const getEntityTypes = QueryConstructor(() => ExternalEntityQueries.getLookupData().then(resp => ({
    ...resp,
    data: resp.success ? resp.data.reduce((a: any, c: any) => {
      if (!a.find((i: any) => i.id === c.entity_type)) a.push({
        id: c.entity_type,
        entity_type: c.entity_type
      })
      return a
    }, []) : undefined,
  })
), [ExternalEntityQueries.getLookupData])

export const ConfigurationTaggingFormMeta: IField[] = [
  {
    label: 'Entity Type',
    fieldName: 'entity_type',
    inputType: DROPDOWN,
    refLookupService: getEntityTypes,
    displayKey: "entity_type",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: 'Entity Name',
    fieldName: 'external_entity',
    inputType: DROPDOWN,
    refLookupService: ExternalEntityQueries.getLookupData,
    displayKey: "entity_name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    refLookupDependencies: ['entity_type'],
    onDependencyChange: (value, {loadOptions}) => loadOptions?.({params: {entity_type: value?.entity_type}}),
  },
  {
    label: 'Configuration Value',
    fieldName: 'config_value',
    inputType: TEXTAREA,
    rules: [{ required: true, message: "This field is required!" }],
  },
]

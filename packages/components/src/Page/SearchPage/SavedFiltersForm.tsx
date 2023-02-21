import { memo, useCallback, useEffect, useRef, useState } from "react"
import { DROPDOWN } from "~/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { UserTableFilterConfigurationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserTableFilterConfigurations"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { MetaDrivenForm, IFormValueMeta, IMetaDrivenFormProps, MetaDrivenFormHandle } from "~/Form/MetaDrivenForm"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { EVENT_SAVE_FILTER } from "./TableFilterFormOpener"

export const SAVED_FILTER_FIELDNAME = `##filter`

export const SavedFiltersForm = memo((props: {
  title?: IMetaDrivenFormProps['title']
  onClear?: IMetaDrivenFormProps['onClear']
  tableName: string,
  onApply: (configurations: Record<string, any>, data: Record<string, any>, details: Record<string, any> | { meta: IFormValueMeta }) => void
  onFormValueMetaChange?: (meta: IFormValueMeta) => void
}) => {
  const { onApply } = props
  const [savedFiltersList, setSavedFiltersList] = useState<Record<string, any>[]>([])
  const initialValue = querystringToObject()
  const metadrivenFormRef = useRef<MetaDrivenFormHandle>(null)
  const [refreshCounter, setRefreshCounter] = useState(0)

  const handleApplyChanges = useCallback((data) => {
    const matchedFilter = savedFiltersList.find(i => i.id === data[SAVED_FILTER_FIELDNAME])!
    if (matchedFilter) {
      onApply(matchedFilter.configurations, data, matchedFilter)
      metadrivenFormRef.current?.clear()
    }
  }, [onApply, savedFiltersList])

  useEffect(() => {
    if (metadrivenFormRef.current) eventBus.subscribe(EVENT_SAVE_FILTER, () => setRefreshCounter(prevVal => prevVal + 1))
    return () => eventBus.unsubscribe(EVENT_SAVE_FILTER)
  }, [])

  return (
    <MetaDrivenForm
      key={`${refreshCounter}`}
      ref={metadrivenFormRef}
      title={props.title}
      initialFormValue={initialValue}
      meta={[{
        label: "Saved Filters",
        fieldName: SAVED_FILTER_FIELDNAME,
        inputType: DROPDOWN,
        refLookupService: QueryConstructor(() => UserTableFilterConfigurationQueries.getList({
          params: { 'table_name': props.tableName }
        }).then(resp => {
          if (resp.success) setSavedFiltersList(resp.data)
          return resp
        }), [UserTableFilterConfigurationQueries.getList]),
        displayKey: "title",
        valueKey: "id",
        defaultValue: initialValue?.[SAVED_FILTER_FIELDNAME]
      }]}
      onApplyChanges={handleApplyChanges}
      onClear={props.onClear}
      onFormValueMetaChange={(meta) => {
        const matchedFilter = savedFiltersList.find(i => i.id === meta[SAVED_FILTER_FIELDNAME].value)!
        if (matchedFilter) props.onFormValueMetaChange?.(matchedFilter.meta)
      }}
      stopProducingQueryParams
      isVertical
      isAside
      showFullForm
    />
  )
})
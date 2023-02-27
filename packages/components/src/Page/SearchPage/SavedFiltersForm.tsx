import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FormProps } from "antd"
import { DROPDOWN, IField } from "~/Form/common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { UserTableFilterConfigurationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserTableFilterConfigurations"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { MetaDrivenForm, IFormValueMeta, IMetaDrivenFormProps, MetaDrivenFormHandle } from "~/Form/MetaDrivenForm"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { EVENT_SAVE_FILTER } from "./TableFilterFormOpener"

export const SAVED_FILTER_FIELDNAME = `##filter`

export interface ISavedFilter {
  id: string
  title: string
  configurations: { [key: string]: any }
  meta: IFormValueMeta
}

export const SavedFiltersForm = (props: {
  title?: IMetaDrivenFormProps['title']
  onClear?: IMetaDrivenFormProps['onClear']
  onReset?: IMetaDrivenFormProps['onReset']
  tableName: string
  onValuesChange: (
    values: any,
    filter: ISavedFilter | undefined
  ) => void
}) => {
  const { onValuesChange } = props
  const [savedFiltersList, setSavedFiltersList] = useState<ISavedFilter[]>([])
  const [initialValue] = useState(querystringToObject())
  const metadrivenFormRef = useRef<MetaDrivenFormHandle>(null)
  const [refreshCounter, setRefreshCounter] = useState(0)

  const meta: IField[] = useMemo(() => ([{
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
    defaultValue: initialValue?.[SAVED_FILTER_FIELDNAME],
  }]), [props.tableName, initialValue])

  const handleValuesChange: FormProps['onValuesChange'] = useCallback((values) => {
    const matchedFilter = savedFiltersList.find(i => i.id === values[SAVED_FILTER_FIELDNAME])
    if (matchedFilter) onValuesChange(values, matchedFilter)
  }, [onValuesChange, savedFiltersList])

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
      meta={meta}
      onClear={props.onClear}
      onReset={props.onReset}
      onValuesChange={handleValuesChange}
      showApplyButton={false}
      showResetbutton
      stopProducingQueryParams
      autoApplyChangeFromQueryParams={false}
      isVertical
      isAside
      showFullForm
    />
  )
}
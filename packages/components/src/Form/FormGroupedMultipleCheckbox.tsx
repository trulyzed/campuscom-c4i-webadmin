import React, { useCallback, useEffect, useState } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Form/common"
import { Checkbox, Skeleton } from "antd"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { IQueryParams } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import { useDependencyValue } from "~/Hooks/useDependencyValue"

export function FormGroupedMultipleCheckbox(props: IGeneratedField & { columnFlex?: string }) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { fieldName, options: optionsProp, formInstance, refLookupService, displayKey, valueKey } = props

  const loadOptions = useCallback(async (params?: IQueryParams): Promise<any[]> => {
    setOptions([])
    formInstance.setFieldsValue({ [fieldName]: undefined })

    if (optionsProp?.length) {
      const adjustedOptions = optionsProp?.map((x) => {
        return {
          group: x[displayKey || "group"],
          options: x[valueKey || "options"]
        }
      })
      setOptions(adjustedOptions)
      return adjustedOptions
    } else if (refLookupService) {
      setLoading(true)
      const x = await refLookupService(params)
      setLoading(false)
      if (x.success) {
        x.data = x.data.map((y: any) => ({
          group: y[displayKey || "group"],
          options: y[valueKey || "options"]
        }))
        setOptions(x.data)
        return x.data
      }
    }
    return []
  }, [formInstance, optionsProp, displayKey, refLookupService, valueKey, fieldName])

  useDependencyValue({ ...props, loadOptions, setOptions })

  const handleChange = useCallback((val: CheckboxValueType[], group: any) => {
    if (options.length < 2) props.formInstance.setFieldsValue({ [props.fieldName]: val })
    else props.formInstance.setFieldsValue({ [props.fieldName]: [...val, ...(props.formInstance.getFieldValue(props.fieldName) as any[] || []).filter(v => !(group.options as any[]).find(o => v === o[props.valueKey2 || "value"]))] })
    // eslint-disable-next-line
  }, [options])

  useEffect(() => {
    if ((!props.dependencies || props.dependencyValue !== undefined) || props.performInitialLookup) loadOptions()
    const eventName = `REFRESH_SEARCH_DROPDOWN_${(refLookupService || new Date().getTime())?.toString() + displayKey + valueKey
      }`
    eventBus.subscribe(eventName, loadOptions)
    return () => {
      eventBus.unsubscribe(eventName)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.formInstance.resetFields([props.fieldName])
    props.formInstance.setFieldsValue({ [props.fieldName]: props.defaultValue })
    // eslint-disable-next-line
  }, [props.defaultValue])

  return (
    <SearchFieldWrapper {...props}>
      <Skeleton loading={loading} active={loading}>
        {options.map((g: any) => (
          <div key={g[props.displayKey || "group"]} style={{ border: "1px solid lightgray", padding: "5px" }}>
            {g[props.displayKey || "group"] ? <h4>{g[props.displayKey || "group"]}</h4> : null}
            <Checkbox.Group
              style={{ width: "100%" }}
              defaultValue={props.formInstance.getFieldValue(props.fieldName)}
              options={g.options.map((o: any) => ({ label: o[props.displayKey2 || "label"], value: o[props.valueKey2 || "value"] }))}
              disabled={props.disabled}
              onChange={(val) => handleChange(val, g)} />
          </div>
        ))}
      </Skeleton>
    </SearchFieldWrapper>
  )
}
